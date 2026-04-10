import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';



const extrairPathRelativo = (urlOuCaminho) => {
    if (!urlOuCaminho || typeof urlOuCaminho !== 'string') {
        return null;
    }

    const semQuery = urlOuCaminho.split('?')[0];

    try {
        const urlParseada = new URL(semQuery, 'http://localhost');
        return decodeURIComponent(urlParseada.pathname).replace(/^\/+/, '');
    } catch {
        return semQuery.replace(/^\/+/, '');
    }
};

export default (CaminhoDoArquivo, parametros = {}) => {
    try {
        const novaUrl = parametros.novaUrl || parametros.novoArquivo || parametros.path;

        if (!novaUrl) {
            throw new Error('nova url do arquivo nao informada');
        }

        if (!CaminhoDoArquivo) {
            return {
                type: 'sucess',
                message: 'arquivo atualizado',
                path: novaUrl
            };
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const pathRelativo = extrairPathRelativo(CaminhoDoArquivo);
        const raizProjeto = path.resolve(__dirname, '../../../');
        const raizSrc = path.resolve(__dirname, '../../');

        const caminhosTentativa = [
            path.resolve(raizProjeto, pathRelativo),
            path.resolve(raizSrc, pathRelativo),
            path.resolve(__dirname, pathRelativo)
        ];

        for (const caminhoCompleto of caminhosTentativa) {
            if (fs.existsSync(caminhoCompleto)) {
                fs.unlinkSync(caminhoCompleto);
                break;
            }
        }

        return {
            type: 'sucess',
            message: 'arquivo atualizado',
            path: novaUrl
        };
    } catch (error) {
        throw new Error(error.message);
    }
};