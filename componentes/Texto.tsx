import { Text, StyleSheet } from "react-native";
import { cores, fontes, tamanhosFonte } from "../tema";

export default function Texto({children, estiloEspecifico}: any){
    return <Text style={[estilos.padrao, estiloEspecifico]}>{children}</Text>
}

const estilos=StyleSheet.create({
    padrao: {
        fontFamily: fontes.padrao,
        fontSize: tamanhosFonte.corpoGrande,
        color: cores.textoCorpo,
        lineHeight: 24,
    }
})
