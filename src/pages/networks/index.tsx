import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";

import { db } from "../../services/firabase.Connection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks() {
    const [github, setGithub] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLikedin] = useState("");

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link");
            getDoc(docRef).then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    setLikedin(snapshot.data()?.linkedin);
                    setInstagram(snapshot.data()?.instagram);
                    setGithub(snapshot.data()?.github);
                }
            });
        }

        loadLinks();
    }, []);

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            linkedin: linkedin,
            instagram: instagram,
            github: github,
        })
            .then(() => {
                alert("Link salvo com sucesso!");
            })
            .catch((error) => {
                console.log("Erro ao salvar link :(");
                console.log(error);
            });
    }

    return (
        <div className=" flex items-center flex-col min-h-screen pb-7 px-2 ">
            <Header />

            <h1 className="text-white font-medium text-2xl mt-8 mb-4">
                Minhas Redes Sociais
            </h1>

            <form
                className=" flex flex-col max-w-xl w-full "
                onSubmit={handleRegister}
            >
                <label className="text-white font-medium mt-2 mb-2">
                    linkedin
                </label>
                <Input
                    type="url"
                    placeholder="Digite o link do seu linkedin"
                    value={linkedin}
                    onChange={(e) => setLikedin(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">
                    Instagrm
                </label>
                <Input
                    type="url"
                    placeholder="Digite o link do seu Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">
                    Github
                </label>
                <Input
                    type="url"
                    placeholder="Digite o link do seu Github"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />

                <button
                    type="submit"
                    className="text -white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}
