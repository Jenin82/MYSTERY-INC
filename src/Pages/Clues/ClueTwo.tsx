import { useEffect } from "react";
import QRScanner from "../QRScanner";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

import styles from "./Clue.module.css";
import audiofile from "./assets/music2.mp3";

export const ClueTwo = () => {
    const navigate = useNavigate();

    const fetchUser = async () => {
        const session = await supabase.auth.getSession();
        if (session.data.session?.user.id) {
            let { data: clue, error } = await supabase
                .from("clue")
                .select("*")
                // Filters
                .eq("id", session.data.session.user.id);
            if (error) {
                throw error.message;
            }
            const progress = clue?.[0]?.progress;
            if (progress < 2) {
                console.log(progress);
                navigate("/2563");
                return;
            }
        }
    };

    useEffect(() => {
        fetchUser();
        // Audio setup
        const audio = new Audio(audiofile);
        audio.loop = true;
        audio
            .play()
            .catch((error) => console.error("Audio play failed:", error));

        // Cleanup function to stop music when component unmounts
        return () => audio.pause();
    }, []);

    return (
        <div className={styles.Clue2}>
            <QRScanner />
        </div>
    );
};
