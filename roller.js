function Roll()
{
    var Dificuldade = 8;
    var QuantidadeDeDados = 4;
    var UsouForcaDeVontade = true;
    var SucessosObtidos = 0;
    var rolagem = Math.floor((Math.random() * 10) + 1);
    var QuantasExplosoes = 0;
    var Rolagens = [];
    var Explosoes = [];
    var isEspecializacao = false;
    var Critico = false;
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
    console.log("Rolagens: " + Rolagens.join(", ") + " - Explosões: " + Explosoes.join(", ") + " - Sucessos: " + SucessosObtidos + " - Dificuldade " + Dificuldade + " - " +
    Critico);
}

Roll();