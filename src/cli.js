import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(chalk.blue('\n\nLista validada'), 
        chalk.bgCyanBright(identificador),
        await listaValidada(resultado));    
    } else {
        console.log(chalk.blue('\n\nLista de links'), 
        chalk.bgCyanBright(identificador),
        resultado);
    }
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';
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
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeDoArquivo) => {
            const resultado = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            imprimeLista(valida, resultado, nomeDoArquivo);
        })
    }
}

processaTexto(caminho);

