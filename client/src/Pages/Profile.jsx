import ProfileCard from "../Components/ProfileCard"
import { useContext, useEffect } from "react";
import Layout from "../Layouts/Layout";
import { AuthContext } from "../Auth/AuthContext";

function Profile()
{
    const { authorize, user, isLoading } = useContext(AuthContext)

    useEffect(() => {
        authorize()
    })

    return(
            <div>
                {!isLoading && user && 
                    <Layout location="profile">
                        <ProfileCard/>
                    </Layout>}
            </div>
    )
}
export default Profile