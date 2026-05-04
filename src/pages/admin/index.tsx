import { useState, type FormEvent, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firabase.Connection";

interface LinksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [bgColorInput, setBgColorInput] = useState("#121212");
    const [textColorInput, setTextColorInupt] = useState("#ffffff");

    const [links, setLinks] = useState<LinksProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "myLinks");
        const queryRef = linksRef;

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as LinksProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                });
            });

            console.log(lista);
            setLinks(lista);
        });

        return () => {
            unsub();
        };
    }, []);

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (nameInput === "" || urlInput === "") {
            alert("Preencha todos os campos!");
            return;
        }

        addDoc(collection(db, "myLinks"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date(),
        })
            .then(() => {
                setNameInput("");
                setUrlInput("");
            })
            .catch((error) => {
                console.log("OPS ALGO DE ERRADO AQUI" + error);
            });
    }

    async function handleDelete(id: string) {
        const docRef = doc(db, "myLinks", id);

        await deleteDoc(docRef);
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header></Header>

            <form
                className="flex flex-col mt-8 mb-3 w-full max-w-xl"
                onSubmit={handleRegister}
            >
                <label className="text-white font-medium mt-2 mb-2">
                    Nome do Link
                </label>
                <Input
                    placeholder="Digite o nome do Link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">
                    URL do Link
                </label>
                <Input
                    type="url"
                    placeholder="Url do Link"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5 ">
                    <div className=" flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">
                            Cor do Link
                        </label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInupt(e.target.value)}
                        />
                    </div>
                    <div className=" flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">
                            Fundo do Link
                        </label>
                        <input
                            type="color"
                            value={bgColorInput}
                            onChange={(e) => setBgColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== "" && (
                    <div className=" flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-3">
                            Veja como está ficando
                        </label>
                        <article
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-blue-900 rounded px-1 py-3 "
                            style={{
                                marginBottom: 8,
                                marginTop: 8,
                                backgroundColor: bgColorInput,
                            }}
                        >
                            <p
                                className="font-medium"
                                style={{ color: textColorInput }}
                            >
                                {nameInput}
                            </p>
                        </article>
                    </div>
                )}

                <button
                    type="submit"
                    className="bg-blue-600 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7"
                >
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

            {links.map((link) => (
                <article
                    key={link.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 mb-2 px-2 select-none"
                    style={{ backgroundColor: link.bg, color: link.color }}
                >
                    <p>{link.name}</p>
                    <div>
                        <button
                            onClick={() => handleDelete(link.id)}
                            className="border border-dashed p-1 rounded bg-neutral-800"
                        >
                            <FiTrash size={22} color="#ffffff">
                                {" "}
                            </FiTrash>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}
