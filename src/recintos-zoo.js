const animais_info = {
    "LEAO": {
        tamanho: 3,
        bioma: ["savana"],
        carnivoro: true
    },
    "LEOPARDO": {
        tamanho: 2,
        bioma: ["savana"],
        carnivoro: true
    }
    ,
    "CROCODILO": {
        tamanho: 3,
        bioma: ["rio"],
        carnivoro: true
    },
    "MACACO": {
        tamanho: 1,
        bioma: ["savana","floresta"],
        carnivoro: false
    }
    ,
    "GAZELA": {
        tamanho: 2,
        bioma: ["savana"],
        carnivoro: false
    }
    ,
    "HIPOPOTAMO": {
        tamanho: 4,
        bioma: ["savana","rio"],
        carnivoro: false
    }
};
class recinto 
{
    constructor(capacidade_maxima,bioma)
    {
        this.capacidade_maxima = capacidade_maxima;
        this.espaço_livre = capacidade_maxima;
        this.bioma = bioma;
        this.animais = [];

        this.tem_carnivoro = false;
        this.especies_diferentes = false;
    }

    lote_valido(animal,quantidade)
    {   
        

        if( !this.bioma.some(item =>animais_info[animal].bioma.includes(item))) // regra 1
            {return false;}

            


        if(!this.animais.includes(animal) && this.tem_carnivoro == true) //regra 2
            {return false;}

        if(!this.animais.includes(animal) && animais_info[animal].carnivoro && this.animais.length != 0)
            return false;
        

        

        var espaço_livre_simulado = this.espaço_livre;
        if(this.especies_diferentes == false && this.animais.length > 0 && !this.animais.includes(animal)) //regra 6
            espaço_livre_simulado -=1;
        if(animais_info[animal].tamanho * quantidade >  espaço_livre_simulado) //regra 1
            return false;


        if(this.bioma.length < 2)
        {
            let tem_hipopotamo = this.animais.includes("HIPOPOTAMO");
             if(animal == "HIPOPOTAMO")
             {
                if(this.animais.length != 0 && !tem_hipopotamo)
                    return false;
             }
             else if(tem_hipopotamo) // regra 4
                return false;
             
        }
        
        
        if(animal == "MACACO" && this.animais.length == 0 && quantidade == 1) //regra 5
            return false;

        espaço_livre_simulado -= animais_info[animal].tamanho * quantidade;
        return [true ,espaço_livre_simulado ];

    }
    adicionar_animal(animal,quantidade)
    {
        if(!animais_info.hasOwnProperty(animal))
            return;
        

        for(let i = 0; i < quantidade ; i++)
        {
         this.animais.push(animal);
         this.espaço_livre -= animais_info[animal].tamanho;
        }
        
        if(animais_info[animal].carnivoro)
            this.tem_carnivoro = true;

        if(!this.especies_diferentes && this.animais.length > 0 && !this.animais.includes(animal))
        {
            this.espaço_livre -=1;
            this.capacidade_maxima -=1;
            this.especies_diferentes = true;
        }
        
        
        
    }
}
class RecintosZoo {

    constructor()
    {
        this.recintos =
        [
            new recinto(10,["savana"]),
            new recinto(5,["floresta"]),
            new recinto(7,["savana","rio"]),
            new recinto(8,["rio"]),
            new recinto(9,["savana"])
        ]
        this.recintos[0].adicionar_animal("MACACO",3);
        this.recintos[2].adicionar_animal("GAZELA",1);
        this.recintos[4].adicionar_animal("LEAO",1);
    }
    analisaRecintos(animal, quantidade) {
        if(!animais_info.hasOwnProperty(animal))
            return {erro:"Animal inválido"}
        if(quantidade <= 0 || !Number.isInteger(quantidade))
            return {erro:"Quantidade inválida"}

        const recintosViaveis = [];
        for(let i = 0 ; i + 1 <= this.recintos.length ; i++)
        {   
            const resultado = this.recintos[i].lote_valido(animal,quantidade);
            if(resultado[0])
                recintosViaveis.push('Recinto ' + (i+1) + ' (espaço livre: ' + resultado[1]+' total: ' +this.recintos[i].capacidade_maxima +')')
        }


        if(recintosViaveis.length == 0)
            return {erro:"Não há recinto viável"}

        return { erro: null, recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
