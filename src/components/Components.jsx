/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import axios from "axios";

export function Components(props) {
    const [components, setComponents] = useState(props.components);
    useEffect(() => {
        setComponents(props.components)
    }, [props.components]);


    const createFile = async (e) => {
        e.preventDefault()

        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:3001',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: JSON.stringify(components)
            })
        } catch (error) {
            var err = new Error('Verifique se o server está rodando na porta 3001 - npm run server');
            return err;
        }
    }

    return (
        <>
            <table className="components-box">
                <tbody>
                    {
                        Object.keys(components).length > 0 ?
                            <>
                                <tr>
                                    <th className="components-content">
                                        <button onClick={createFile} className="button-custom" type="submit">Gerar Arquivo</button>
                                    </th>
                                </tr>
                            </>
                            : null
                    }
                    {
                        components.length > 0 ?
                            components.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{item}</th>
                                    </tr>
                                )
                            }) :
                            <tr>
                                <td>🎨 Os componentes serão listados logo abaixo:</td>
                            </tr>
                    }
                </tbody>
            </table>
        </>
    );
}
