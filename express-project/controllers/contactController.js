const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const getPagination = require("../helpers/pagination");
const  getFilter = require("../helpers/filter");
const getSort = require("../helpers/sort");

const getPaginatedContacts = asyncHandler(async (req, res) => {
    try{
        const { page, limit, skip} = getPagination(req.query);
        const filter = getFilter(req.query, req.user.id);
        const sort = getSort(req.query);
    
        const [contacts, totalContacts] = await Promise.all([
            Contact.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            Contact.countDocuments(filter),
        ])

        res.status(200).json({
            contacts: contacts,
            totalPages: Math.ceil(totalContacts / limit),
            currentPage: page,
            totalItems: totalContacts,
        });

    } catch (error) {
        console.error('Error fetching paginated contacts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id }).lean();
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required!");
    }
    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
    
    res.status(201).json(contact);
});

const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user.id },
        req.body,
        {new: true, runValidators: true}
    );

    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    };

    res.status(204).json({message: `Successfully deleted contact with id ${req.params.id}`});
});

module.exports = {
    getContactById, 
    createContact, 
    updateContactById, 
    deleteContactById, 
    getPaginatedContacts
};
