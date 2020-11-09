export const getIcons = async (figmaApiKey, figmaId) => {
    const url = `https://api.figma.com/v1/files/${figmaId}`;
    let response;

    try {
        response = await fetch(url, {
            headers: { "X-FIGMA-TOKEN": figmaApiKey },
            method: "get"
        });
        if (response.status === 200) {
            const data = await response.json()
            const frames = await data.document.children.filter(children => children.name === "Design Tokens")[0].children;
            const iconFrames = await frames.filter(data => data.name === "Icons")
            console.log(iconFrames)
            const iconFramesId = await iconFrames[0].id
            console.log(iconFramesId)

            return handleIcons(iconFramesId, figmaId, figmaApiKey)

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
        var err = new Error('Error ao importar os arquivos de ícones');
        return err;
    }
}

const handleIcons = async (iconId, figmaId, figmaApiKey) => {
    const url = `https://api.figma.com/v1/images/${figmaId}/?ids=${iconId.replace(':', '%3A')}&format=svg`;
    let response;

    try {
        response = await fetch(url, {
            headers: { "X-FIGMA-TOKEN": figmaApiKey },
            method: "get"
        });
        if (response.status === 200) {
            const data = await response.json()
            return data.images[iconId]

        } else {
            switch (response.status) {
                case 403:
                    throw new Error(`${response.status} - Cannot authenicate you`);
                case 404:
                    throw new Error(
                        `${response.status} - Cannot find icon`
                    );
                default:
                    break;
            }
            return;
        }
    } catch (error) {
        var err = new Error('Error ao importar os ícones');
        return err;
    }
}