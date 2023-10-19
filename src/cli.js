import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';

const caminho = process.argv;

function imprimeLista(resultado, identificador = '') {
    console.log(chalk.blue('\n\nLista de links'), 
    chalk.bgCyanBright(identificador),
    resultado);
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.red('arquivo ou diretório não existe'));
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDoArquivo) => {
            const resultado = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            imprimeLista(resultado, nomeDoArquivo);
        })
    }
}

processaTexto(caminho);

