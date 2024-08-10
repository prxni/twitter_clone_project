import { useContext, useEffect } from "react";
import Layout from "../Layouts/Layout";
import { AuthContext } from "../Auth/AuthContext";

export default function Home(){

    const { authorize, user, isLoading } = useContext(AuthContext)

    useEffect(() => {
        authorize()
    })

    return(
        <div>
            {!isLoading && user && 
            <Layout location="home">
                <div></div>
            </Layout>}
        </div>
    )
}