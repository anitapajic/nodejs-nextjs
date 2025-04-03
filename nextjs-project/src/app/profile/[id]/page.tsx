import { Content } from "@/app/content";

export default function UserProfile({params}: any){
return(
    <Content>
        <div className="flex text-center justify-center">
            <p>Profile page with path param: {params.id}</p>
        </div>
    </Content>
)
}