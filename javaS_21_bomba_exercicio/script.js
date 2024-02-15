var cont = 0;
var ponto = "*";
var numerosDigitados = [];
var botoes = document.querySelectorAll('.teclas button');

//audios
var audio = document.getElementById('bip');
var erro = document.getElementById("erro");
var desa = document.getElementById("desativado");
var ativado = document.getElementById("ativado");
var pausado = document.getElementById("pausado");
var abort = document.getElementById("abort");

// verificadores
var verifIniciar = false;
var explosao = false;
var desativador = false;
var pausa = false;
var verifParar = false;
var abortamento = false;

document.getElementById('orient').innerHTML = "CLIQUE EM INICIAR PARA COMEÇAR.";

function iniciar() {
    if (explosao) {
        return;
    }
    ativado.play();
    document.getElementById('orient').innerHTML = "DIGITE A SENHA '123456'";
    if (verifIniciar === false) {
        verifIniciar = true;
        document.getElementById("tela").style.animation = "Iniciar 0.8s forwards";

        for (var i = 1; i <= 9; i++) {
            document.getElementById('num' + i).addEventListener('click', function () {
                audio.play();

                if (cont < 6) {
                    cont++;
                    document.getElementById('num').innerHTML = ponto.repeat(cont);
                    numerosDigitados.push(parseInt(this.textContent)); // Adiciona o numero clicado no array

                    if (numerosDigitados.length == 6) {

                        if (numerosDigitados.join('') == '123456') { //senha de ativação
                            document.getElementById('num').innerHTML = "CÓDIGO CORRETO!";
                            document.getElementById('orient').innerHTML = "CÓDIGO DIGITADO CORRETAMENTE.";
                            if (desativador === false) {
                                explodir();
                            } else {
                                document.getElementById("tela").style.removeProperty("animation");
                                pausarContagem();
                            }


                        } else {
                            document.getElementById('num').innerHTML = "CÓDIGO INVÁLIDO!";
                            document.getElementById('orient').innerHTML = "CÓDIGO INVÁLIDO, DIGITE A SENHA CORRETAMENTE.";
                            if (desativador === false) {
                                document.getElementById("tela").style.removeProperty("animation");
                                document.getElementById('tela').style.backgroundColor = "rgb(150, 18, 18)";
                                erro.play();
                                setTimeout(function () {
                                    reiniciar();
                                    desa.play();
                                    document.getElementById('tela').style.removeProperty("background-color");
                                    document.getElementById("tela").style.backgroundColor = "rgb(1, 134, 1)";
                                }, 2000);
                            } else {
                                document.getElementById('num').innerHTML = "CÓDIGO INVÁLIDO!";
                                erro.play();
                                setTimeout(function () {
                                    desa.play();
                                    desativador = false;
                                    contagem.textContent = tempoRestante;
                                }, 2000);
                            }

                        }
                    }
                }
            });
        }
    }
}

//Funções:
function reiniciar() {
    if (explosao) {
        return;
    }
    numerosDigitados = [];
    cont = 0;
    document.getElementById('num').innerHTML = "";
    iniciar();
}

function explodir() {
    const contagem = document.getElementById('num');
    const vintesegundos = document.getElementById("vintesegundos");
    const dezseg = document.getElementById("dezseg");
    const voz30seg = document.getElementById("voz30seg");
    const contagemSom = document.getElementById("contagemSom");

    voz30seg.play();

    let tempoRestante = 23;
    let desativador = false;
    let explosao = true;

    const countdownInterval = setInterval(function () {
        if (!desativador) {
            contagem.textContent = tempoRestante;
            document.getElementById('orient').innerHTML = "PARA PARAR A CONTAGEM, CLIQUE EM 'PARAR'.";
        }

        if (!pausa) {
            document.getElementById("tela").style.removeProperty("animation");
            document.getElementById('tela').style.backgroundColor = "rgb(150, 18, 18)";
        } else {
            document.getElementById('tela').style.backgroundColor = "rgb(132, 134, 1)";
        }

        if (tempoRestante <= 0) {
            clearInterval(countdownInterval);
            num.textContent = 'BOOM!';
            document.getElementById('orient').innerHTML = " ";

            setTimeout(() => explosaoFinal(), 500);
        } else {
            if (!pausa) {
                audio.play();

                if (tempoRestante === 17) {
                    contagemSom.volume = 0.3;
                    contagemSom.play();
                }

                if (tempoRestante === 20) {
                    vintesegundos.play();
                }

                if (tempoRestante === 9) {
                    dezseg.play();
                }

                tempoRestante--;
            }
        }

        if (!verifParar) {
            document.getElementById('Parar').addEventListener('click', desativar);
        }
    }, 1000);
}

function desativar() {
    verifParar = true;
    //Ferar todas as informações anteriores
    numerosDigitados = [];
    cont = 0;
    document.getElementById('num').innerHTML = "DIGITE A SENHA...";
    desativador = true
    document.getElementById('orient').innerHTML = "DIGITE A SENHA '123456' PARA PARAR A CONTAGEM";
}

function pausarContagem() {
    document.getElementById('orient').innerHTML = "CONTEGEM PAUSADA...";
    pausado.play();
    document.getElementById('tela').style.backgroundColor = "rgb(132, 134, 1)";
    pausa = true;
    desa.play();
    contagemSom.pause();
    setTimeout(function () {
        document.getElementById('num').innerHTML = "CONTINUAR?";
        document.getElementById('orient').innerHTML = "USE 'INICIAR' PARA RETOMAR OU 'PARAR' PARA ABORTAR.";
    }, 1000);
    document.getElementById('Iniciar').addEventListener('click', resume);
    document.getElementById('Parar').addEventListener('click', abortar);
}

function abortar() {
    abort.play();
    desa.play();
    document.getElementById('num').innerHTML = "ABORTADO!";
    abortamento = true;
    document.getElementById('orient').innerHTML = "A CONTAGEM FOI ABORTADA!";

    setTimeout(function () {
        document.getElementById('orient').innerHTML = "REINICIANDO...";
        numerosDigitados = [];
        document.getElementById('num').innerHTML = "";
        verifIniciar = false;
        explosao = false;
        reiniciar();
    }, 2200);
    setTimeout(function () {
        document.getElementById('orient').innerHTML = "...";
        document.getElementById('tela').style.backgroundColor = "rgb(1, 64, 1)";
        recarregar()
        erro.play();
    }, 2800);
}
function recarregar() {
    window.location.reload();
}

function resume() {
    if (abortamento === false) {
        document.getElementById('orient').innerHTML = "RETOMANDO CONTAGEM...";
        document.getElementById('num').innerHTML = "CONTINUANDO...";

        setTimeout(function () {
            document.getElementById('orient').innerHTML = "CONTAGEM RETOMADA!";
            pausa = false;
            desativador = false;
            contagemSom.play()
            document.getElementById("tela").style.removeProperty("animation");
            document.getElementById('tela').style.backgroundColor = "rgb(150, 18, 18)";
        }, 1000);
    }
}

function explosaoFinal() {
    var gifElement = document.createElement('img');
    gifElement.src = 'imgs/explotion.gif';
    gifElement.style.width = '100%';
    gifElement.style.height = '100%';
    gifElement.style.position = 'fixed';
    gifElement.style.top = '0';
    gifElement.style.left = '0';
    document.body.appendChild(gifElement);

    setTimeout(function () {
        document.body.innerHTML = '';
        document.body.style.backgroundImage = 'url("imgs/maxresdefault.jpg")';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
    }, 500);

    setTimeout(function () {
        var explosaoSom = document.getElementById("explosaoSom");
        explosaoSom.play();
        document.body.removeChild(gifElement);
    }, 1000);
}

