const { spawn } = require('child_process');

function reSize (video, qualidade){
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
            `${parent}/resultado/${video}-${quality}.mp4`
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
