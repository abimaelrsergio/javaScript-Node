import fs from 'fs';
import chalk from 'chalk';

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretorio'));
}

// https://regex101.com/
function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?$#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados;
}

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        const resultado = extraiLinks(texto);
        console.log(resultado);
    } catch (erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.yellow('operação concluída'));
    }
}

pegaArquivo('./arquivos/texto.md');

