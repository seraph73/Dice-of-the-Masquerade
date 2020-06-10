const Discord = require('discord.js');
const { v, vf, ve, vef, token } = require('./config.json');
const client = new Discord.Client();
client.once('ready', () => {
	console.log('Estou ligado!');
});
const PossiveisInputs = 
{
    QuantidadeDeDados : "",
    Dificuldade : 6,
    MensagemValida(message)
    {
        return (message.content.startsWith(v) || message.content.startsWith(ve) ||message.content.startsWith(vf) || message.content.startsWith(vef));
    },
    PossuiDados(message, split)
    {
        var res = message.content.split(" ");
        QuantidadeDeDados = (res[1]);
        QuantidadeDeDados = parseInt(QuantidadeDeDados);
        if(res[2] != undefined)
        {
            Dificuldade = (res[2]);
            Dificuldade = parseInt(Dificuldade);
        }
        else
        {
            Dificuldade = 6;
        }

        if(!Number.isInteger(QuantidadeDeDados) && split != "ds")
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    v(message)
    {
        return RolarDados(QuantidadeDeDados, Dificuldade, false, false);
    },
    vf(message)
    {
        return RolarDados(QuantidadeDeDados, Dificuldade, false, true);
    },
    ve(message)
    {
        return RolarDados(QuantidadeDeDados, Dificuldade, true, false);        
    },
    vef(message)
    {
        return RolarDados(QuantidadeDeDados, Dificuldade, true, true);        
    }
}

function CriarMensagem(message)
{
    var split = message.content.substring(1, 4);

    if(split < 2 || split == "")
    {
        return "Não é um comando válido";
    }
    if(split.includes(" "))
    {
        split = split.substr(0,split.indexOf(' '));
    }
    if(PossiveisInputs.PossuiDados(message, split))
    {       
        const GetMensagem = PossiveisInputs[split.toString()];

        return GetMensagem(message);
    }
    return "Não é um comando válido";
}

client.on('message', message => {

    var MensagemNoDiscord;
    if(PossiveisInputs.MensagemValida(message))
    {
        MensagemNoDiscord = CriarMensagem(message);        
    }
    if(MensagemNoDiscord != null)
    {
        message.channel.send(MensagemNoDiscord);
    }
})

client.login(token);

function RolarDados(QuantidadeDeDados, Dificuldade, isEspecializacao, UsouForcaDeVontade)
{
    var SucessosObtidos = 0;
    var QuantasExplosoes = 0;
    var Rolagens = [];
    var Explosoes = [];
    var Critico = false;
    
    var rolagem = Math.floor((Math.random() * 10) + 1);
    
    for (var i = 0; i < QuantidadeDeDados; i++)
    {
        var rolagem = Math.floor((Math.random() * 10) + 1);
        if(rolagem >= Dificuldade)
        {
            SucessosObtidos++;
            if(isEspecializacao && rolagem == 10)
            {
                QuantasExplosoes++;
            }
        }
        else
        {
            if(rolagem == 1)
            {
                SucessosObtidos--;
            }
        }

        Rolagens.push(rolagem);
    }

    for(i = 0; i < QuantasExplosoes; i++)
    {
        var rolagemExplosao = Math.floor((Math.random() * 10) + 1);

        if(rolagemExplosao >= Dificuldade)
        {
            SucessosObtidos++;
            if(isEspecializacao && rolagemExplosao == 10)
            {
                QuantasExplosoes++;
            }
        }
        else
        {
            if(rolagemExplosao == 1)
            {
                SucessosObtidos--;
            }
        }

        Explosoes.push(rolagemExplosao);
    }
    
    if(UsouForcaDeVontade)
    {
        if(SucessosObtidos <= 0)
        {
            SucessosObtidos = 1;
        }
        else
        {
            SucessosObtidos++;
        }
    }

    if(SucessosObtidos <= 0 && (Rolagens.includes(1) || Explosoes.includes(1)))
    {
        Critico = true;
    }

    var RolagensNaTela = Rolagens.join(", ");
    var ExplosoesNaTela;
    if(Explosoes.length <= 0)
    {
        Explosoes.push("-");
        ExplosoesNaTela = Explosoes;
    }
    else
    {
        ExplosoesNaTela = Explosoes.join(", ");
    }
    var SucessoMensagem;
    if(SucessosObtidos == 1)
    {
        SucessoMensagem = " sucesso foi obtido";
    }
    else
    {
        SucessoMensagem = " sucessos foram obtidos";
    }
    var MensagemDado;
    if(QuantidadeDeDados == 1)
    {
        MensagemDado = " dado";
    }
    else
    {
        MensagemDado = " dados";
    }
    var MensagemResultado;
    if(Critico)
    {
        MensagemResultado = "Falha Crítica!";
    }
    else
    {
        MensagemResultado = SucessosObtidos + SucessoMensagem;
    }
    
    var mensagemEmbed = new Discord.MessageEmbed()
    .setColor('#2b7b5b')
    .setTitle('Resultado: ' + MensagemResultado)
    .setThumbnail('https://i.imgur.com/26ZtjS5.png')
    .addFields(
        { name: 'Parada', value: QuantidadeDeDados + MensagemDado, inline: true},
        { name: 'Rolagens', value: RolagensNaTela, inline: true },
        { name: 'Dificuldade', value: Dificuldade, inline: true }
    )
    if(UsouForcaDeVontade)
    {
        mensagemEmbed.addFields({ name: 'Força de Vontade', value: "Usou", inline: true })
    }
    else
    {
        mensagemEmbed.addFields({ name: 'Força de Vontade', value: "Não Usou", inline: true })
    }
    if(isEspecializacao)
    {
        mensagemEmbed.addFields(
        { name: 'Explosões', value: ExplosoesNaTela, inline: true },
        { name: 'Rolagem com Especialização', value: "Sim", inline: true }
        )
    }
    else
    {
        mensagemEmbed.addFields( 
        { name: 'Explosões', value: ExplosoesNaTela, inline: true },
        { name: 'Rolagem com Especialização', value: "Não", inline: true }
        )
    }
    return mensagemEmbed;
}