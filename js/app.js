const ingresos = [new Ingreso("Payment", 2100), new Ingreso("Sell", 1500)];

const egresos = [new Egreso("Rent", 900), new Egreso("Clothes", 100)];

function cargarApp() {
  cargarCabecero();
  cargarValores();
}

function totalVal(cat) {
  let total = 0;
  for (let val of cat) {
    total += val.valor;
  }
  return total;
}

function formatCurrency(val) {
  return val.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function cargarCabecero() {
  let presupuesto = totalVal(ingresos) - totalVal(egresos);
  document.getElementById("presupuesto").innerHTML =
    formatCurrency(presupuesto);
  document.getElementById("ingresos").innerHTML = formatCurrency(
    totalVal(ingresos)
  );
  document.getElementById("egresos").innerHTML = formatCurrency(
    totalVal(egresos)
  );
  document.getElementById("porcentaje").innerHTML = (
    totalVal(egresos) / totalVal(ingresos)
  ).toLocaleString("en-US", { style: "percent", minimumFractionDigits: 2 });
}

function cargarValores(){
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngreso(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;

    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgreso(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

function crearIngreso(ingreso){
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatCurrency(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminar(${'ingresos'}, ${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

function crearEgreso(egreso){
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatCurrency(egreso.valor)}</div>
            <div class="elemento_porcentaje">${(egreso.valor / totalVal(egresos)).toLocaleString("en-US", { style: "percent", minimumFractionDigits: 2 })}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" 
                    onclick="eliminar(${'egresos'}, ${egreso.id})"></ion-icon>
                </button>
            </div>
        </div> 
    </div>
                    `;
    return egresoHTML;
}

function eliminar(cat, id) {
    console.log(cat)
    if(confirm('Are you sure you want to delete this?')){
        let indexDel = cat.findIndex(ingreso => ingreso.id === id);
        cat.splice(indexDel, 1);
    }
    cargarCabecero();
    cargarValores();
}

function agregarDato(){
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor']
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarValores();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarValores();
        }
        document.getElementById('descripcion').value = ''
        document.getElementById('valor').value = ''
    }
}