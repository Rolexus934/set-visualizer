import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InfoCard from "./InfoCard";
import { InlineMath } from "react-katex";
import Header from "./Header";


export default function FunctionDisplay({ relData }) {
    const funcData = relData.isFunction;
    const injectData = relData.isInjective;
    const surjectData = relData.isSurjective;


    let biyectData = 'es inyectiva y sobreyectiva, por lo tanto es biyectiva.';
    if(!injectData.value || !surjectData.value){
        if(!injectData.value && !surjectData.value){
            biyectData = 'no es ni inyectiva ni sobreyectiva, por lo tanto no puede ser biyectiva.'
        }
        else if(!injectData.value) biyectData = 'no es inyectiva, por lo tanto no puede ser biyectiva.'
        else biyectData = 'no es sobreyectiva, por lo tanto no puede ser biyectiva.'
    }
    

    const inyectivaCard = <InfoCard
        title="¿Es R inyectiva?"
        value={injectData.value ? 'Es inyectiva' : 'No es inyectiva'}
        valuecolor={injectData.value ? 'green' : 'red'}
        content={injectData.info}
    />
    const sobreyectivaCard = <InfoCard
        title="¿Es R sobreyectiva?"
        value={surjectData.value ? 'Es sobreyectiva' : 'No es sobreyectiva'}
        valuecolor={surjectData.value ? 'green' : 'red'}
        content={surjectData.info}
    />
    const biyectivaCard = <InfoCard
        title="¿Es R biyectiva?"
        value={injectData.value && surjectData.value ? 'Es biyectiva' : 'No es biyectiva'}
        valuecolor={funcData.value ? 'green' : 'red'}
        content={<p><InlineMath math={String.raw`\mathrel{\mathcal{R}}`}/> {biyectData}</p>}
    />

    return <>
        <Grid>
            <Header size="h4" title="Funciones y propiedades"  content="Analizemos las propiedades de R como función. "></Header>
            <InfoCard
                title="¿Es R una funcion?"
                value={funcData.value ? 'Es una funcion' : 'No es una función'}
                valuecolor={funcData.value ? 'green' : 'red'}
                content={funcData.info}
            />
            {funcData.value && inyectivaCard}
            {funcData.value && sobreyectivaCard}
            {funcData.value && biyectivaCard}
        </Grid>
    </>
}


