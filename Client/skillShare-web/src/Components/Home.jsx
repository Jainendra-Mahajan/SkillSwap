import { useEffect, useState } from "react";
import HomePageSearch from "./HomePageSearch";
import SkillCard from "./SkillCard";
import axios, { Axios } from "axios"

const Home = () => {

    const [skills, setSkills] = useState([]);
    useEffect(() => {
        fetchSkills();
    }, [])

    const fetchSkills = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/skills", {
                withCredentials: true,
            });
            setSkills(res?.data?.data);
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        }
    };

    return (
        <div className="md:mx-50">
            <HomePageSearch />
            <div className="badge badge-neutral m-5">Neutral</div>

            {
                skills.length > 0 && skills.map((skill) => (
                    <SkillCard key={skill?._id} skill={skill} />))
            }

        </div>
    )
}

export default Home;