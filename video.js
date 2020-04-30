const { spawn } = require('child_process');


//node[0] videos[1] ./animes[2]
const parent = process.argv[2]

let videos = []


if(process.argv[2]){//Localizando todos os videos dentro do diretorio

	const start = parseInt(process.argv[3])
	const end = parseInt(process.argv[4])

		for (let i = start; i <= end; i++) {
			videos.push(i);
		}
		videos.reverse();//Alimentando o vetor com o endereço dos videos
		processo();// Função para passar os paramentros do videos/endereços e redimenciona
}else{
	console.log('É NECESSARIO CRIAR UM DIRETORIO DE NÍVEL SUPERIOR!');
}


function reSize (video, quality){
	const p = new Promise((resolve,reject)=>{
		const ffmpeg = spawn('./aux/ffmpeg/bin/ffmpeg',[
			 '-i',
            `${parent}/${video}.mp4`,
            '-codec:v',
            'libx264',
            '-profile:v',
            'main',
            '-preset',
            'slow',
            '-b:v',
            '400k',
            '-maxrate',
            '400k',
            '-bufsize',
            '800k',
            '-vf',
            `scale=-2:${quality}`,
            '-threads',
            '0',
            '-b:a',
            '128k',
            `${parent}/resultados/${video}-${quality}.mp4`
		]);
		ffmpeg.stderr.on('data',(data)=>{
			console.log(data);
		})
		ffmpeg.on('close',(code)=>{
			resolve()
		})
	})

	return p;
}


async function processo () {
	let video = videos.pop()
	if (video) {
		try {
			await reSize(video, 720)
			await reSize(video, 480)
			await reSize(video, 360)

			console.log(`Videos renderizados - ${video}`);

			processo()//recursividade
		}catch(e){
			console.log(e)
		}
	}
}

