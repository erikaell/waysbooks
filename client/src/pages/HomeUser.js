import NavbarUser from "../components/Navbar/NavbarUser"
import Books from "../components/Books"

function HomeUser() {

    return (
        <>
            <div>
                <div className="bodyHome">
                    <div className="backgroundImage">
                        <NavbarUser />
                        <Books />
                    </div>
                </div>
            </div>

        </>
    );
}

export default HomeUser;