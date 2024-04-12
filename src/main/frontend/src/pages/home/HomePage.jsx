import Main from "../chat/Main.jsx";
import SideBar from "../chat/SideBar.jsx";
import classes from "../../style/home/HomPage.module.css"


const HomePage = () => {


    return (
        <div className={classes.flex}>
            <SideBar/>
            <Main/>
        </div>
    );
}

export default HomePage;