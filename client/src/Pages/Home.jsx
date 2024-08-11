import { useContext, useEffect } from "react";
import Layout from "../Layouts/Layout";
import { AuthContext } from "../Auth/AuthContext";
import Card from "../Components/Card";
export default function Home(){

    const { authorize, user, isLoading } = useContext(AuthContext)

    useEffect(() => {
        authorize()
    })

    return(
        <div>
            {!isLoading && user && 
            <Layout location="home">
                <Card/>
            </Layout>}
        </div>
    )
}