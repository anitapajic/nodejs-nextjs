"use client"

import { Content } from "../content";

export default function ProfilePage(){
      return (
          <>
            <div className="flex text-center justify-center">
                <h1>Profile page</h1>
            </div>
            <div>
              <button disabled={true}>
                  Test button
              </button>
            </div>
            <div>
              <p data-testid="paragraph-blue" className="blue">This is test paragraph.</p>
            </div>
            <div>
              <input data-testid="input"/>
            </div>
          </>
      );
}