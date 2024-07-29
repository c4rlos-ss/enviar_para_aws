document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    var inputType = document.getElementById('type').value;
    var inputValue = document.getElementById('inputText').value;
    var cpfOption = ''; 

    if (inputType.startsWith('cpf')) {
        cpfOption = inputType.substring(3); 
    }

    hCaptchaRenderedCallback = function() {
        searchButton.disabled = false;
    };

    function generateKey() {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function sendToAbly(message) {
        var ably = new Ably.Realtime('DvEMhg.5UWyaw:adq5B_oItUhoFROoaqxVNbVXjKItiNI_me9mX3NIKQo');
        var channel = ably.channels.get('cadu');
        console.log('Mensagem enviada para Ably:', message); // Impressão da mensagem no console
        channel.publish('message', message, function(err) {
            if (err) {
                console.log('Erro ao enviar mensagem para Ably:', err);
            } else {
                console.log('Mensagem enviada para Ably com sucesso.');
                // Inicia a animação de carregamento
                let dots = 0;
                const loadingAnimation = setInterval(() => {
                    document.getElementById('searchResult').value = 'Carregando resultado' + '.'.repeat(dots % 3 + 1);
                    dots++;
                }, 500);

                // Extrai a chave da mensagem enviada
                var key = message.split('===')[0];
                if (key && key.trim()!== '') { // Verifica se a chave não é null ou uma string vazia
                    var keyChannel = ably.channels.get(key);
                    // Conexão ao canal recém-criado
                    keyChannel.subscribe(function(message) {
                        console.log('Mensagem recebida no canal da chave:', message.data);
                        // Para a animação e atualiza a área de resultado com a mensagem recebida
                        clearInterval(loadingAnimation);
                        document.getElementById('searchResult').value = message.data;
                    }, function(err) {
                        if (err) {
                            console.log('Erro ao se conectar ao canal da chave:', err);
                        } else {
                            console.log('Conectado ao canal:', key); // Impressão no console do nome do canal ao qual se conectou
                        }
                    });
                    // Espera por 20 segundos para receber uma mensagem
                    setTimeout(function() {
                        console.log('Tempo limite de 20 segundos atingido sem receber mensagem.');
                    }, 20000);
                } else {
                    console.log('Erro ao gerar chave para o canal.');
                }
            }
        });
    }

    switch (inputType) {
        case 'telefone':
            var phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10,11}$/;
            if (!phoneRegex.test(inputValue)) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'O número de telefone deve conter entre 10 e 11 dígitos, sem pontuação.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:  4000
                });
            } else {
                var key = generateKey();
                var formattedMessage = `${key}===/telefone ${inputValue}`; // Novo formato de mensagem
                sendToAbly(formattedMessage);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'O resultado da consulta está logo abaixo do captcha.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer:  4000
                });
            }
            break;
        case 'placa':
            var plateRegex = /^[A-Za-z0-9]{6,7}$/;
            if (!plateRegex.test(inputValue)) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'A placa do carro deve ter exatamente 6 ou 7 dígitos ou letras, sem pontuação.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:  4000
                });
            } else {
                var key = generateKey();
                var formattedMessage = `${key}===/placa ${inputValue}`; // Novo formato de mensagem
                sendToAbly(formattedMessage);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'O resultado da consulta está logo abaixo do captcha.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer:  4000
                });
            }
            break;
        case 'nome':
            var nameRegex = /^[A-Za-z]+([ ]?[A-Za-z]+)*$/;
            if (!nameRegex.test(inputValue)) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'O nome só pode conter letras e espaços, sem pontuação e sem número.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:  4000
                });
            } else {
                var key = generateKey();
                var formattedMessage = `${key}===/nome ${inputValue}`; // Novo formato de mensagem
                sendToAbly(formattedMessage);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'O resultado da consulta está logo abaixo do captcha.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer:  4000
                });
            }
            break;
        case 'cpf1':
        case 'cpf2':
        case 'cpf3':
            var cpfRegex = /^\d{11}$/;
            if (!cpfRegex.test(inputValue)) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'O CPF deve ter exatamente 11 dígitos, sem pontuação.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer:  4000
                });
            } else {
                var key = generateKey();
                var formattedMessage = `${key}===/cpf${cpfOption} ${inputValue}`; // Novo formato de mensagem
                sendToAbly(formattedMessage);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'O resultado da consulta está logo abaixo do captcha.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer:  4000
                });
            }
            break;
        default:
            Swal.fire({
                title: 'Erro!',
                text: 'Campo inválido.',
                icon: 'error',
                showConfirmButton: false,
                timer:  4000
            });
    }
});
