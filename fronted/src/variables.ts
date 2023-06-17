


class CustomProperties {

    names:string[] = []
    values:string[] = []

    constructor(){

    }

    add(name:string,value:string){
        this.names.push(name)
        this.values.push(value)
    }

    get(index:number){
        return [this.names[index],this.values[index]]
    }

    
}

const customProperites = new CustomProperties()

// customProperites.add("--color-primary","#EDA415")
// customProperites.add("--color-secondary","#87BCD9")
// customProperites.add("--color-text-dark","#292D32")
// customProperites.add("--color-blue-dark","#003F62")
// customProperites.add("--color-black-dark","#3A3A3A")


export const writeAllCustomProperites = () => {
   for(let i = 0 ; i < customProperites.values.length;i++){
        const [name,key] = customProperites.get(i)
        document.documentElement.style.setProperty(name,key)
   }
}