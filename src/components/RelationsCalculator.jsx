import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import BasicCard from "./BasicCard";
import AddRelation from "./AddRelation";
import FunctionDisplay from "./FunctionDisplay";
import RelationDisplay from "./RelationDisplay";

import { InlineMath } from "react-katex";
import { Fort } from "@mui/icons-material";

class Relation {
  constructor(arr, setA, setB, relType) {
    this.arr = arr;
    this.setA = { ...setA };
    this.setB = { ...setB };
    this.set = this.parseSet();
    this.string = this.parseString();
    this.katexString = this.parseKatexString();
    this.binaryRel = false;
    this.relType = relType;
  }

  parseSet() {
    const set = new Set();
    this.arr.forEach((e) => {
      set.add(e.toString());
    });
    return set;
  }
  parseString() {
    let strArr = [];
    this.arr.forEach((pair) => {
      strArr.push(`(${pair[0]}, ${pair[1]})`);
    });
    return strArr.join();
  }
  parseKatexString() {
    return this.arr.length
      ? String.raw`\{ ${this.string} \}`
      : String.raw`\varnothing`;
  }
}

class RelationUtil {
  constructor(relation) {
    this.relation = { ...relation };
    this.homogeneous =
      this.relation.relType === "aa" || this.relation.relType === "bb";

    this.setSize = this.relation.setA.arrSet.length;
    this.adyList = this.createAdylist();
    this.isFunction = this.isFunction();
    this.isInjective = this.isInjective();
    this.isSurjective = this.isSurjective();
    this.mapA = this.mapElementToIndex(this.relation.setA.arrSet);
    this.mapB = this.mapElementToIndex(this.relation.setB.arrSet);

    if (this.homogeneous) {
      this.setLabel = this.relation.setA.label;
      this.matrix = this.createRelMatrix();
      this.katexMatrix = this.createKatexMatrix();
      this.isReflexive = this.checkReflexive();
      this.isSymmetric = this.checkSymmetric();
      this.isTransitive = this.checkTransitive();
      this.isAntiSymmetric = this.checkAntisymmetric();
    }
  }
  createAdylist() {
    //domain -> {image}
    const rel = this.relation.arr;
    const domain = this.relation.setA.arrSet;
    const adyList = {};
    domain.forEach((element) => {
      adyList[element] = new Set();
    });

    rel.forEach((pair) => {
      adyList[pair[0]].add(pair[1]);
    });

    return adyList;
  }
  createInvAdyList() {
    //image -> {domain}
    const rel = this.relation.arr;
    const img = this.relation.setB.arrSet;
    const invAdyList = {};
    img.forEach((element) => {
      invAdyList[element] = [];
    });
    rel.forEach((pair) => {
      invAdyList[pair[1]].push(pair[0]);
    });

    return invAdyList;
  }
  mapElementToIndex(values) {
    console.log(values);
    //maps every value on the set from 0 to n;
    const map = {};
    for (let x = 0; x < values.length; x++) {
      map[values[x]] = x;
    }
    return map;
  }
  createRelMatrix() {
    if (!this.relation.binaryRel) return [];
    //initialize

    const n = this.setSize;
    console.log(n);
    let matrix = [];
    for (let x = 0; x < n; x++) {
      const tempArr = [];
      for (let y = 0; y < n; y++) {
        tempArr.push(0);
      }
      matrix.push(tempArr);
    }
    //creates a NxN matrix with values initialized on 0
    const adyl = this.adyList;
    const map = this.mapA;
    console.log("lookatmymap");
    console.log(map);
    console.log(matrix);
    for (const [key, value] of Object.entries(adyl)) {
      value.forEach((e) => {
        matrix[map[key]][map[e]] = 1;
      });
    }

    return matrix;
  }
  createKatexMatrix() {
    const matrix = this.matrix;
    const temp = [];
    matrix.forEach((row) => {
      temp.push(row.join(" & "));
    });
    const strMatrix = temp.join(String.raw`\\`);
    return String.raw`\begin{pmatrix} ${strMatrix} \end{pmatrix}`;
  }
  isFunction() {
    const adyl = this.adyList;
    const inputLabel = this.relation.setA.label;
    const outputLabel = this.relation.setB.label;
    let infoBlock = (
      <p>
        Se cumple que para cada x, el f(x) producido en {outputLabel} es único.{" "}
        <br></br> Dicho de otra forma{" "}
        <InlineMath>{String.raw`\forall x \in ${inputLabel}, \exists ! y \in ${outputLabel} : f(x) = y`}</InlineMath>
      </p>
    );

    const response = { value: true, info: null };

    for (const [key, value] of Object.entries(adyl)) {
      if (value.size > 1) {
        response.value = false;
        //turn set into an array
        const arrStr = Array.from(value).toString();
        infoBlock = (
          <p>
            Existe un <InlineMath>{String.raw`x\in A`}</InlineMath> tal que{" "}
            <InlineMath>f(x)</InlineMath> no es unico. Si{" "}
            <InlineMath
              math={String.raw`x = ${key}, f(${key}) = \{ ${arrStr} \}`}
            >
              {" "}
            </InlineMath>
            . Como existen multiples valores para {`f(${key})`}, R no es una
            funcion.
          </p>
        );
        break;
      }
    }

    response.info = infoBlock;

    return response;
  }

  isInjective() {
    const invAdyl = this.createInvAdyList();
    const inputLabel = this.relation.setA.label;
    let infoBlock = (
      <p>
        Se cumple la relacion uno a uno en{" "}
        <InlineMath math={String.raw`\forall x \in ${inputLabel}`} /> para f(x).{" "}
        <br /> Dicho de otra forma{" "}
        <InlineMath>{String.raw`\forall x, y \in ${inputLabel}, f(x) = f(y) \Longrightarrow x = y`}</InlineMath>
      </p>
    );

    const response = { value: true, info: null };

    for (const [key, value] of Object.entries(invAdyl)) {
      if (value.length > 1) {
        response.value = false;
        //turn set into a string
        const arrStr = Array.from(value).toString();
        infoBlock = (
          <p>
            Existe un par distinto de{" "}
            <InlineMath>{String.raw`x,y\in ${inputLabel}`}</InlineMath> tal que
            cuando{" "}
            <InlineMath math={String.raw`x \neq y \Longrightarrow f(x) = f(y)`}>
              {" "}
            </InlineMath>{" "}
            <br></br>
            Si{" "}
            <InlineMath
              math={String.raw`x = ${value[0]}, y =${value[1]} \Longrightarrow f(${value[0]}) = f(${value[1]})`}
            >
              {" "}
            </InlineMath>
            , aun cuando <InlineMath math={String.raw` x \neq y`} />. Por lo
            tanto, R no es una funcion inyectiva.
          </p>
        );
        break;
      }
    }

    response.info = infoBlock;

    return response;
  }

  isSurjective() {
    const invAdyl = this.createInvAdyList();
    const inputLabel = this.relation.setA.label;
    const outputLabel = this.relation.setB.label;
    let infoBlock = (
      <p>
        Todo elemento de B está asociado a un elemento de A <br /> Dicho de otra
        forma{" "}
        <InlineMath>{String.raw`\forall y \in ${outputLabel}, \exists x \in A : f(x) = y`}</InlineMath>
      </p>
    );

    const response = { value: true, info: null };

    for (const [key, value] of Object.entries(invAdyl)) {
      if (value.length == 0) {
        response.value = false;
        const arrStr = value.toString();
        infoBlock = (
          <p>
            {" "}
            Existe un elemento b en {outputLabel} que no está asociado a ningun
            elemento de {inputLabel} <br />
            Dicho de otra forma,{" "}
            <InlineMath
              math={String.raw`\exists x \in ${outputLabel}, \forall y \in ${inputLabel} : f(x) \neq y `}
            />{" "}
            <br />
            La defincion no se satiface para{" "}
            <InlineMath math={`y = ${key}`}></InlineMath>
          </p>
        );
        break;
      }
    }

    response.info = infoBlock;

    return response;
  }
  checkReflexive() {
    const set = this.relation.setA.arrSet;
    const map = this.mapA;
    let flag = true;
    let badElement;
    set.forEach((e) => {
      if (this.matrix[map[e]][map[e]] == 0) {
        badElement = e;
        flag = false;
      }
    });

    const response = { value: null, info: null };
    response.value = flag;
    if (!response.value) {
      response.info = (
        <p>
          Para que R sea simetrica, se tiene que cumplir que{" "}
          <InlineMath
            math={String.raw`\forall x \in ${this.setLabel}, \exists (x,x) \in R`}
          />
          <br />
          Sin embargo{" "}
          <InlineMath math={String.raw`${badElement} \in ${this.setLabel}`} /> ,
          mientras que el par{" "}
          <InlineMath
            math={String.raw`(${badElement},${badElement}) \notin R`}
          />{" "}
          <br />
          Por lo tanto, R no es una relación reflexiva.
        </p>
      );
    } else {
      response.info = (
        <p>
          Se cumple que{" "}
          <InlineMath
            math={String.raw`\forall x \in ${this.setLabel}, \exists (x,x) \in R`}
          />{" "}
          <br />
          Por lo tanto, la relacion es simétrica
        </p>
      );
    }

    return response;
  }
  checkSymmetric() {
    const size = this.setSize;
    const map = this.mapA;
    const set = this.relation.setA.arrSet;
    let flag = true;
    let badPair = null;
    for (let x = 0; x < size && flag; x++) {
      for (let y = 0; y < size; y++) {
        if (this.matrix[x][y] == 1 && this.matrix[y][x] == 0) {
          badPair = { a: set[x], b: set[y] };
          flag = false;
          break;
        }
      }
    }
    console.log("badpairrr");
    console.log(badPair);
    console.log(map);
    const response = { value: null, info: null };
    response.value = flag;
    if (!response.value) {
      response.info = (
        <p>
          Para que R sea simétrica, se tiene que cumplir que{" "}
          <InlineMath
            math={String.raw`\forall x,y \in ${this.setLabel}, \exists (x,y) \in R \longrightarrow (y,x) \in R`}
          />
          <br />
          Sin embargo, el par{" "}
          <InlineMath math={String.raw`(${badPair.a},${badPair.b}) \in R `} /> ,
          mientras que{" "}
          <InlineMath math={String.raw`(${badPair.b},${badPair.a}) \notin R`} />{" "}
          <br />
          Por lo tanto, R no es una relación simétrica.
        </p>
      );
    } else {
      response.info = (
        <p>
          Se cumple que{" "}
          <InlineMath math={String.raw`\forall x,y \in ${this.setLabel}, `} />{" "}
          <InlineMath math={String.raw`\exists (x,y) \in R`} /> entonces{" "}
          <InlineMath math={String.raw`(y,x) \in R`} /> <br></br>
          Por lo tanto, la relacion es simétrica
        </p>
      );
    }

    return response;
  }
  checkAntisymmetric() {
    const size = this.setSize;
    const map = this.mapA;
    const set = this.relation.setA.arrSet;
    let badPair = null;
    let flag = true;
    for (let x = 0; x < size && flag; x++) {
      for (let y = 0; y < size; y++) {
        if (this.matrix[x][y] == 1 && this.matrix[y][x] == 1 && x != y) {
          badPair = { a: set[x], b: set[y] };
          flag = false;
          break;
        }
      }
    }

    const response = { value: null, info: null };
    response.value = flag;
    if (!response.value) {
      response.info = (
        <p>
          Para que R sea Antisimétrica, se tiene que cumplir que{" "}
          <InlineMath math={String.raw`\forall x,y \in ${this.setLabel}`} /> si
          <InlineMath
            math={String.raw`(x,y) \in R \land (y,x) \in R \Longrightarrow x = y`}
          />
          <br />
          Sin embargo, el par{" "}
          <InlineMath
            math={String.raw`(${badPair.a},${badPair.b}) \in R \land (${badPair.b},${badPair.a}) \in R`}
          />{" "}
          aún cuando <InlineMath math={String.raw`x \neq y`} />
          <br />
          Por lo tanto, R no es una relación simétrica.
        </p>
      );
    } else {
      response.info = (
        <p>
          Se cumple que{" "}
          <InlineMath math={String.raw`\forall x,y \in ${this.setLabel}`} /> si
          <InlineMath
            math={String.raw`(x,y) \in R \land (y,x) \in R \Longrightarrow x = y`}
          />{" "}
          <br />
          Por lo tanto, la relacion es simétrica.
        </p>
      );
    }

    return response;
  }
  checkTransitive() {
    const set = this.relation.setA.arrSet;
    const adyList = this.adyList;
    const map = this.mapA;
    let badTriplet = null;
    let flag = true;
    for (let a of set) {
      if (!flag) break;
      //obtaining the related elements of a
      console.log(a);
      console.log(adyList);
      const elementRelated = adyList[a];

      //for every b related to a (a,b)
      for (let b of elementRelated) {
        if (!flag) break;
        //obtaining the related elements of b
        const childRelated = adyList[b];
        //for every c related to b (b,c)
        for (let c of childRelated) {
          //if (a is related to b) and (b is related to c) then (c is related to a)
          if (!elementRelated.has(c)) {
            //if the previous rule does not comply for every element, then R is not transitive
            badTriplet = { a: a, b: b, c: c };
            console.log(a, b, c);
            flag = false;
            break;
          }
        }
      }
    }

    const response = { value: null, info: null };
    response.value = flag;
    console.log(this.setLabel);
    if (!response.value) {
      response.info = (
        <p>
          Para que R sea transitiva, se tiene que cumplir que{" "}
          <InlineMath
            math={String.raw`\forall x,y,z \in ${this.setLabel}: (x,y) \in R \land (y,z) \in R \Longrightarrow (x,z) \in R`}
          />{" "}
          <br />
          Sin embargo, se cumple que{" "}
          <InlineMath
            math={String.raw`(${badTriplet.a}, ${badTriplet.b}) \in R `}
            y
          />{" y "}
          <InlineMath
            math={String.raw`(${badTriplet.b}, ${badTriplet.c}) \in R `}
            y
          />
          {" "} pero {" "}
          <InlineMath
            math={String.raw`(${badTriplet.a}, ${badTriplet.c}) \notin R`}
          />
          <br />
          Por lo tanto, R no es una relación transitiva.
        </p>
      );
    } else {
      response.info = (
        <p>
          Se cumple que{" "}
          <InlineMath
            math={String.raw`\forall x,y,z \in ${this.setLabel}: (x,y) \in R  \land  (y,z) \in R \Longrightarrow (x,z) \in R`}
          />
          <br />
          Por lo tanto, la relacion es transitiva.
        </p>
      );
    }

    return response;
  }
}

function RelationsCalculator({ sets }) {
  const { setA, setB } = sets;

  const [relation, setRelation] = useState(
    new Relation([], { ...setA }, { ...setB })
  );
  const [processedRel, setProcessedRel] = useState(false);
  console.log(setA);
  console.log(setB);
  console.log(relation);

  const updateRelation = (valueA, valueB) => {
    setRelation(new Relation([...relation.arr, [valueA, valueB]], setA, setB));
  };
  const deleteRelation = () => {
    setRelation(new Relation([], setA, setB));
    setProcessedRel(false);
  };
  const processRelation = (relType) => {
    if (relType === "aa") {
      relation.setB = { ...setA };
      relation.binaryRel = true;
    } else if (relType === "bb") {
      relation.setA = { ...setB };
      relation.binaryRel = true;
    }
    relation.relType = relType;

    setProcessedRel(true);
  };

  let relUtil = null;

  if (processedRel) relUtil = new RelationUtil(relation);

  console.log(relUtil);

  const displayFunction = <FunctionDisplay relData={relUtil} />;
  const displayRelProps = <RelationDisplay relData={relUtil} />;

  return (
    <>
      <AddRelation
        processedStatus={processedRel}
        processRelationHandler={processRelation}
        updateRelationHandler={updateRelation}
        deleteRelationHandler={deleteRelation}
        setA={setA}
        setB={setB}
        relation={relation}
      />
      {processedRel && displayFunction}
      {processedRel && relUtil.homogeneous && displayRelProps}
    </>
  );
}

export default RelationsCalculator;
