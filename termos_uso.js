setTimeout(() => {
  Swal.fire({
    title: 'Termos de Uso',
    html: `
    <style>
  input[type="checkbox"] {
    transform: scale(2); /* Aumenta o tamanho do checkbox */
  }
</style>
      <p><strong>Artigo 1º:</strong> Esta lei estabelece os termos de uso para a página Pantera Puxadas, com o objetivo de garantir a conformidade com a LGPD e a proteção dos dados pessoais dos usuários.</p>
         <p><strong>Artigo 2º:</strong> Definições<br>
         I - Dados pessoais: Informação relacionada a pessoa natural identificada ou identificável.<br>
         II - Titular dos dados: Pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.<br>
         III - Controlador: Pessoa natural ou jurídica, de direito público ou privado, a quem competem as decisões referentes ao tratamento de dados pessoais.<br>
         IV - Operador: Pessoa natural ou jurídica, de direito público ou privado, que realiza o tratamento de dados pessoais em nome do controlador.</p>
 
         <p><strong>Artigo 3º:</strong> A página Pantera Puxadas obterá o consentimento explícito dos usuários antes de coletar, armazenar ou processar quaisquer dados pessoais, conforme estabelecido no artigo 7º da LGPD.</p>
 
         <p><strong>Artigo 4º:</strong> A página Pantera Puxadas não armazenará dados pessoais dos usuários, conforme estabelecido no artigo 13 e artigo 10  da LGPD.</p>
 
         <p><strong>Artigo 5º:</strong> A página Pantera Puxadas servirá como uma ponte de ligação com outro sistema, facilitando a consulta de dados pelos advogados, desde que esses dados estejam em conformidade com a LGPD.</p>
 
         <p><strong>Artigo 6º:</strong> Fica expressamente proibido o uso da página Pantera Puxadas para fins criminosos, conforme estabelecido no artigo 10  da LGPD.</p>
 
         <p><strong>Artigo 7º:</strong> Os titulares dos dados têm o direito de:<br>
         I - Confirmar a existência de tratamento de seus dados pessoais;<br>
         II - Acessar seus dados pessoais;<br>
         III - Corrigir dados incompletos, inexatos ou desatualizados;<br>
         IV - Anonimizar, bloquear ou eliminar dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;<br>
         V - Solicitar a portabilidade de seus dados pessoais a outro fornecedor de serviço ou produto;<br>
         VI - Revogar o consentimento, conforme estabelecido no artigo 8º da LGPD.</p>
 
         <p><strong>Artigo 8º:</strong> A página Pantera Puxadas implementará medidas de segurança adequadas para garantir a proteção dos dados pessoais dos usuários, conforme estabelecido no artigo 13 da LGPD.</p>
 
         <p><strong>Artigo 9º:</strong> A página Pantera Puxadas não compartilhará dados pessoais dos usuários com terceiros, exceto quando necessário para a prestação dos serviços ou conforme exigido por lei, sempre em conformidade com a LGPD.</p>
 
         <p><strong>Artigo 10º:</strong> A página Pantera Puxadas nomeará um encarregado de proteção de dados, conforme exigido pelo artigo 41 da LGPD. O encarregado poderá ser contatado pelo e-mail panterapuxadas@gmail.com </p>
 
         <p><strong>Artigo 11º:</strong> A página Pantera Puxadas estará em conformidade com as demais disposições da LGPD, incluindo a proteção dos dados pessoais, a preservação da privacidade e a garantia da segurança dos usuários.</p>
 
         <p><strong>Artigo 12º:</strong> A página Pantera Puxadas reserva-se o direito de atualizar estes termos de uso periodicamente. Os usuários serão notificados sobre quaisquer alterações significativas por meio de (método de notificação, como e-mail ou aviso no site).</p>
 
         <p><strong>Artigo 13º:</strong> Qualquer violação desta lei estará sujeita às penalidades previstas na LGPD, conforme estabelecido no artigo 52 da referida lei.</p>
 
         <p><strong>Artigo 14º:</strong> Esta lei entra em vigor na data de sua publicação.</p>
        <span>
          <input type="checkbox" id="termos" name="termos" value="aceito"> 
          <label for="termos"> Eu li e estou de acordo com os termos de uso!</label>
        </span>
      </div>
    `,
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Confirmar',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      setTimeout(() => {
        var confirmButton = document.querySelector('.swal2-confirm');
        if (confirmButton) {
          confirmButton.style.backgroundColor = '#ccc';
          document.getElementById('termos').addEventListener('change', function() {
            if (this.checked) {
              confirmButton.style.backgroundColor = '#3085d6';
            } else {
              confirmButton.style.backgroundColor = '#ccc';
            }
          });
        }
      }, 100);
    },
    preConfirm: () => {
      if (!document.getElementById('termos').checked) {
        Swal.showValidationMessage('Você precisa concordar com os termos para continuar.');
        return false;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Agradecemos!',
        text: 'Você concordou com os termos de uso.',
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }
  });
}, 3000);