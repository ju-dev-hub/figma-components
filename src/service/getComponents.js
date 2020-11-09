import { getButtons } from './getButtons'
import { getInputs } from './getInputs'

import _ from 'lodash';

const setComponents = async (frames) => {
    const button = await getButtons(frames)
    const input = await getInputs(frames)

    return _.concat(button, input)
}

export const getComponents = async (figmaApiKey, figmaId) => {
    const url = `https://api.figma.com/v1/files/${figmaId}`;
    let response;

    try {
        response = await fetch(url, {
            headers: { "X-FIGMA-TOKEN": figmaApiKey },
            method: "get"
        });
        if (response.status === 200) {
            const data = await response.json()

            const frames = await data.document.children.filter(children => children.name === "Components")[0].children;

            console.log(frames)
            return await setComponents(frames)
        } else {
            switch (response.status) {
                case 403:
                    throw new Error(`${response.status} - Cannot authenicate you`);
                case 404:
                    throw new Error(
                        `${response.status} - Cannot find board (id:${figmaId})`
                    );
                default:
                    break;
            }
            return;
        }
    } catch (error) {
        var err = new Error('Erro ao tentar importar os componentes por meio da API do Figma. Verifique seus dados e tente novamente.');
        return err;
    }
}
