class ValidCPF{
    constructor(cpf){
        this.cpfClean = cpf.replace(/\D+/g, '');
    }
    checkCPF(){
        if (this.cpfClean === "undefined") return false;
        if (this.cpfClean.length !== 11) return false;
        if (this.cpfClean[0].repeat(11) === this.cpfClean) return false;
        
        return this.cpfClean === this.createCPF();
    }
    createCPF(){
        const cpfSemDig = this.cpfClean.slice(0, -2);
        const firstDig = this.createDig(cpfSemDig);
        const secunDig = this.createDig(cpfSemDig + firstDig);
        const createdCPF = cpfSemDig + firstDig + secunDig;

        return createdCPF;
    }
    createDig(cpfSemDig){
        const cpfArray = Array.from(cpfSemDig);
        let regress = cpfArray.length + 1;
        let sumTotal = cpfArray.reduce((acc, valor) => {
            acc += Number(valor) * regress;
            regress--;
            return acc;
        }, 0);
        sumTotal = 11 - (sumTotal % 11);
        return String(sumTotal > 9 ? 0 : sumTotal);
    }
}