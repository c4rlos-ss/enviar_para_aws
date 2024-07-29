const Ably = require('ably');
const fs = require('fs');
const { exec } = require('child_process');
const chokidar = require('chokidar');

const ably = new Ably.Realtime('DvEMhg.5UWyaw:adq5B_oItUhoFROoaqxVNbVXjKItiNI_me9mX3NIKQo');
const channel = ably.channels.get('cadu');

function sendMessageToAbly(message) {
  channel.publish('message', { text: message }, (err) => {
    if (err) {
      console.error('Erro ao enviar mensagem para o Ably:', err);
    } else {
      console.log('Mensagem enviada para o Ably:', message);
    }
  });
}

channel.subscribe((msg) => {
  // Verifica se a mensagem não está vazia antes de processá-la
  if (!msg.data || typeof msg.data!== 'string') {
    console.log('Mensagem vazia ignorada.');
    return; // Ignora a mensagem vazia e sai da função
  }

  console.log('Mensagem recebida:', msg.data);
  fs.appendFile('mensagemDOusuario.txt', `${msg.data}\n`, (err) => {
    if (err) throw err;
    console.log('Mensagem salva no arquivo mensagemDOusuario.txt');

    exec('python3 main.py', (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      exec('node enviar.js', (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);

        const watcher = chokidar.watch('resultadofinal.txt', { persistent: true });

        watcher.on('change', (path) => {
          fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
              console.error('Erro ao ler o arquivo:', err);
              return;
            }
            console.log('Arquivo alterado, enviando conteúdo para o canal Ably:', data);
            sendMessageToAbly(data);
          });
        });
      });
    });
  });
});

ably.connection.once('connected', () => {
  console.log('Conectado ao Ably e ouvindo mensagens no canal "cadu"!');
});

console.log('Tudo pronto Aguardando mensagens...');
