import { Text, StyleSheet } from "react-native";
import { cores, fontes, tamanhosFonte } from "../tema";

export default function Logo({ estiloEspecifico }: any) {
    return <Text style={[estilos.logo, estiloEspecifico]}>Feltrin Noivas</Text>
}

const estilos = StyleSheet.create({
    logo: {
        fontFamily: fontes.logo,
        fontSize: tamanhosFonte.logo,
        lineHeight: 52,
        color: cores.texto,
        textAlign: 'center',
    }
})
