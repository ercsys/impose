function theme_toggle(){
    var theme = document.getElementById("main");
    var value = theme.getAttribute("data-bs-theme");
    (value == "dark") ? theme.setAttribute("data-bs-theme","light") : theme.setAttribute("data-bs-theme","dark");
    
}

// global keyup function
document.getElementById("reset").setAttribute("onclick", "reset();");
document.getElementById("susunan").setAttribute("onchange", "process(); bentuk_susunan()");
document.getElementById("paper_size").setAttribute("onchange", "template_size(); process()");

document.getElementById("paper_width").setAttribute("onkeyup", "custom_size(); paper_size_name(); process()");
document.getElementById("paper_height").setAttribute("onkeyup", "custom_size(); paper_size_name(); process()");

document.getElementById("area_width").setAttribute("onkeyup", "process()");
document.getElementById("area_height").setAttribute("onkeyup", "process()");

document.getElementById("print_width").setAttribute("onkeyup", "process();");
document.getElementById("print_height").setAttribute("onkeyup", "process();");
document.getElementById("left_right").setAttribute("onkeyup", "process()");
document.getElementById("top_bottom").setAttribute("onkeyup", "process()");

document.getElementById("jumlah_file").setAttribute("onkeyup", "process()");
document.getElementById("jumlah_cetak").setAttribute("onkeyup", "process()");
document.getElementById("sisi_cetak").setAttribute("onchange", "sisi(); process()");

document.getElementById('customer').setAttribute("onkeyup", "process()");
document.getElementById('judul_file').setAttribute("onkeyup", "process()");
document.getElementById('bahan').setAttribute("onkeyup", "process()");
document.getElementById('kode_nota').setAttribute("onkeyup", "process()");
document.getElementById('finishing_1').setAttribute("onchange", "process()");
document.getElementById('finishing_2').setAttribute("onchange", "process()");
document.getElementById('finishing_3').setAttribute("onchange", "process()");

// defined global variable
let susunan = document.getElementById("susunan");
let shape_print = document.getElementsByClassName("shape-print");

let paper_width = document.getElementById("paper_width");
let paper_height = document.getElementById("paper_height");

let area_width = document.getElementById("area_width");
let area_height = document.getElementById("area_height");

let print_width = document.getElementById("print_width");
let print_height = document.getElementById("print_height");

let bleed_lr = document.getElementById("left_right");
let bleed_tb = document.getElementById("top_bottom");

let sisi_cetak = document.getElementById("sisi_cetak");
let jumlah_file = document.getElementById("jumlah_file");
let jumlah_cetak = document.getElementById("jumlah_cetak");

let pz = document.getElementById("paper_size");

fetch('./paper.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            let sz = data[i]['paper_width']+"x"+data[i]['paper_height']+"x"+data[i]['area_width']+"x"+data[i]['area_height'];
            pz.innerHTML += "<option value = "+sz+">"+data[i]['title']+" ("+data[i]["paper_width"]+"x"+data[i]["paper_height"]+"mm)</option>";
        }
    })

function bentuk_susunan(){
    switch (susunan.value) {
        case "1":
            for (let s = 0; s < shape_print.length; s++) {
                shape_print[s].classList.remove("circle");
                shape_print[s].classList.remove("circleX");
            }
            break;
        case "2":
            for (let s = 0; s < shape_print.length; s++) {
                shape_print[s].classList.add("circle");
            }
            break;
            
            default:
            for (let s = 0; s < shape_print.length; s++) {
                shape_print[s].classList.add("circleX");
            }
            break;
    }
}

function template_size(){
    let get_size = pz.value.split("x");
    
    paper_width.value = get_size[0];
    paper_height.value = get_size[1];
    area_width.value = get_size[2];
    area_height.value = get_size[3];

    area_width.setAttribute("disabled", "disabled");
    area_height.setAttribute("disabled", "disabled");

    paper_size_name();
}

function paper_size_name(){
    let size_width = Number(paper_width.value)/10+" cm";
    let size_height = Number(paper_height.value)/10+" cm";

    document.getElementById("potrait_width_paper").innerHTML = size_width;
    document.getElementById("potrait_height_paper").innerHTML = size_height;
    
    document.getElementById("landscape_width_paper").innerHTML = size_height;
    document.getElementById("landscape_height_paper").innerHTML = size_width;
}

function custom_size(){
    pz.value = "";
    area_width.removeAttribute("disabled");
    area_height.removeAttribute("disabled");

    area_width.value = paper_width.value;
    area_height.value = paper_height.value;
}

function color_table(a,b,c,d){
    if (a) {
        document.getElementById('potrait_row_col').classList.remove('bg-comparison');
        document.getElementById('potrait_result').classList.remove('bg-comparison');
        document.getElementById('potrait_qty').classList.remove('bg-comparison');
    }

    if (b) {
        document.getElementById('landscape_row_col').classList.remove('bg-comparison');
        document.getElementById('landscape_result').classList.remove('bg-comparison');
        document.getElementById('landscape_qty').classList.remove('bg-comparison');
    }

    if (c) {
        document.getElementById('potrait_row_col').className = 'bg-comparison';
        document.getElementById('potrait_result').className = 'bg-comparison';
        document.getElementById('potrait_qty').className = 'bg-comparison';
    }
    
    if (d) {
        document.getElementById('landscape_row_col').className = 'bg-comparison';
        document.getElementById('landscape_result').className = 'bg-comparison';
        document.getElementById('landscape_qty').className = 'bg-comparison';
    }
}

var cond;
var side = sisi_cetak.value;
function sisi(){
    switch (sisi_cetak.value) {
        case "4":
            print_width.value = Number(print_width.value)*2;
            cond = "1";
            side = "2";
            break;
    
        default:
            (cond == "1") ? print_width.value = Number(print_width.value)/2 : null;
            cond = "0";
            side = sisi_cetak.value;
            break;
    }
    // (sisi_cetak.value == "4") ? print_width.value = Number(print_width.value)*2 : print_width.value = print_width.value;
}

function process(){
    let customer    = document.getElementById('customer');
    let judul_file  = document.getElementById('judul_file');
    let bahan       = document.getElementById('bahan');
    let finishing_1 = document.getElementById('finishing_1');
    let finishing_2 = document.getElementById('finishing_2');
    let finishing_3 = document.getElementById('finishing_3');
    let kode_nota   = document.getElementById('kode_nota');
    let potrait_result, landscape_result, potrait_col, potrait_row, landscape_col, landscape_row, potrait_cons, landscape_cons, area_pw, area_ph, area_lw, area_lh, shape_potrait, shape_landscape;
    // bleed dan warning booklet page
    bleed_tb.value = bleed_lr.value;
    if (sisi_cetak.value == "4") {
        var min_page = Math.ceil(Number(jumlah_file.value)/4)*4;
        document.getElementById("warning_halaman").innerHTML = "* disarankan halaman kelipatan 4 ("+min_page+" Halaman)";
        document.getElementById("warning_halaman").classList.remove("d-none");
    }else{
        document.getElementById("warning_halaman").className = "d-none";
    }

    // print size total
    let print_w = Number(print_width.value) + Number(bleed_lr.value);
    let print_h = Number(print_height.value) + Number(bleed_tb.value);

    let potrait_size = document.getElementById("potrait_size");
    let landscape_size = document.getElementById("landscape_size");

    let potrait_area = document.getElementById("potrait_area");
    let landscape_area = document.getElementById("landscape_area");

    // size print    
    potrait_size.style.cssText = "width:"+(paper_width.value*2)/10+"mm;height:"+(paper_height.value*2)/10+"mm;";
    landscape_size.style.cssText = "width:"+(paper_height.value*2)/10+"mm;height:"+(paper_width.value*2)/10+"mm;";
    
    potrait_area.style.cssText = "width:"+(area_width.value*2)/10+"mm;height:"+(area_height.value*2)/10+"mm;";
    landscape_area.style.cssText = "width:"+(area_height.value*2)/10+"mm;height:"+(area_width.value*2)/10+"mm;";

    if ((susunan.value == 3) && (print_w != "") && (print_h != "")) {
        console.log("BRICK");
        // susun brick

        let bleed_border;
        (top_bottom.value > 0 ) ? bleed_border = 1 : bleed_border = 0;

        let r = (Number(print_h)/2);
        let pgap = (Math.sqrt(3)*r).toFixed(2);
        
        // let pheight_obj = ((print_h*2)-(print_h-pgap))-(print_h-pgap);
        let prowP = (area_height.value/pgap);
        let lrowL = (area_width.value/pgap);

        
        let pwidth1 = Math.floor(area_width.value/print_w);
        let pwidth2 = Math.floor((area_width.value-(print_w/2))/print_w);
        let lwidth1 = Math.floor(area_height.value/print_w);
        let lwidth2 = Math.floor((area_height.value-(print_w/2))/print_w);


        let prow;
        let lrow;
        let real_pwidth;
        let real_lwidth;

        if (prowP%1 >= 0.1) {
            prow = Math.ceil((prowP))-1;
        }else{
            prow = Math.round(prowP)-1;
        }

        if (lrowL%1 >= 0.15) {
            lrow = Math.ceil(lrowL)-1;
            
        }else{
            lrow = Math.round(lrowL)-1;
        }

        let real_gapP = (print_h-pgap);
        let real_pheight = ((prow*print_h))-((prow-1)*real_gapP);

        let real_gapL = (print_h-pgap);
        let real_lheight = ((lrow*print_h))-((lrow-1)*real_gapL);

        if (prow%2 != 0) {
            potrait_row1 = Math.ceil(prow/2);
            potrait_row2 = Math.floor(prow/2);
            potrait_col1 = potrait_row1*pwidth1;
            potrait_col2 = potrait_row2*pwidth2;
        }else{
            potrait_row1 = (prow/2);
            potrait_row2 = (prow/2);
            potrait_col1 = potrait_row1*pwidth1;
            potrait_col2 = potrait_row2*pwidth2;
        }

        if (lrow%2 != 0) {
            landscape_row1 = Math.ceil(lrow/2);
            landscape_row2 = Math.floor(lrow/2);
            landscape_col1 = landscape_row1*lwidth1;
            landscape_col2 = landscape_row2*lwidth2;
        }else{
            landscape_row1 = (lrow/2);
            landscape_row2 = (lrow/2);
            landscape_col1 = landscape_row1*lwidth1;
            landscape_col2 = landscape_row2*lwidth2;
        }

        // loop
        let p = '';
        let l = '';

        let x = 1;
        for (let rowP = 1; rowP <= prow; rowP++) {
            if (rowP%2 != 0) {
                for (let baris1 = 1; baris1 <= pwidth1; baris1++) {                            
                    // baris ganjil tetap
                    p += '<div class="shape-print" style="border:'+(bleed_border/2)+'mm solid white; background-clip:border-box;position:relative;top:-'+(((rowP-1)*2)*(print_h-pgap)/2)/5+'mm;width:'+(print_w*2)/10+'mm;height:'+(print_h*2)/10+'mm;">'+x+'</div>';
                    x++;
                }
                
            }else{
                for (let baris2 = 1; baris2 <= pwidth2; baris2++) {                            
                    p += '<div class="shape-print" style="border:'+(bleed_border/2)+'mm solid white; background-clip:border-box;position:relative;left:'+(print_w/2)/5+'mm;top:-'+(((rowP-1)*2)*(print_h-pgap)/2)/5+'mm;width:'+(print_w*2)/10+'mm;height:'+(print_h*2)/10+'mm;">'+x+'</div>';
                    x++;
                }
                if (pwidth1 != pwidth2) {
                    p += '<div class="shape-print bg-none outline-none" style="border:'+(bleed_border/2)+'mm solid none; background-clip:border-box;position:relative;left:'+(print_w/2)/5+'mm;top:-'+(((rowP-1)*2)*(print_h-pgap)/2)/5+'mm;width:'+(print_w*2)/10+'mm;height:'+(print_h*2)/10+'mm;"></div>';
                    
                    // document.getElementById("potrait_area").style.width = (print_w*pwidth1)/5+'mm';
                    real_pwidth = (print_w*pwidth1).toFixed(2);
                    
                }else{
                    // document.getElementById("potrait_area").style.width = (print_w*pwidth1)/5+'mm';
                    real_pwidth =((print_w*pwidth1)+(print_w/2)).toFixed(2);
                }
            }
        }

        let y = 1;
        for (let rowL = 1; rowL <= lrow; rowL++) {
            if (rowL%2 != 0) {
                for (let barisL1 = 1; barisL1 <= lwidth1; barisL1++) {                          
                    // baris genap tetap
                    l += '<div class="shape-print" style="border:'+(bleed_border/2)+'mm solid white; background-clip:border-box;position:relative;top:-'+(((rowL-1)*2)*(print_h-pgap)/2)/5+'mm;width:'+(print_w*2)/10+'mm;height:'+(print_h*2)/10+'mm;">'+y+'</div>';
                    y++;
                }
            
            }else{
                for (let barisL2 = 1; barisL2 <= lwidth2; barisL2++) {                            
                    l += '<div class="shape-print" style="border:'+(bleed_border/2)+'mm solid white; background-clip:border-box;position:relative;left:'+(print_w/2)/5+'mm;top:-'+(((rowL-1)*2)*(print_h-pgap)/2)/5+'mm;width:'+(print_w*2)/10+'mm;height:'+(print_h*2)/10+'mm;">'+y+'</div>';
                    y++;
                }
                if (lwidth1 != lwidth2) {                        
                    l += '<div class="shape-print bg-none outline-none" style="border:'+(bleed_border/2)+'mm solid none; background-clip:border-box;position:relative;left:'+(print_w/2)/5+'mm;top:-'+(((rowL-1)*2)*(print_h-pgap)/2)/5+'mm;width:'+(print_w*2)/10+'mm;height:'+(print_h*2)/10+'mm;"></div>';

                    // document.getElementById("landscape_area").style.width = (print_w*lwidth1)/5+'mm';
                    real_lwidth = (print_w*lwidth1).toFixed(2);
                }else{
                    // document.getElementById("landscape_area").style.width = (print_w*lwidth1)/5+'mm';
                    real_lwidth = ((print_w*lwidth1)+(print_w/2)).toFixed(2);
                }
                
            }
        }
        

        potrait_item.innerHTML = p;
        landscape_item.innerHTML = l;
        // document.getElementById("potrait_area").style.height = (real_pheight/5+'mm');
        // document.getElementById("landscape_area").style.height = (real_lheight/5+'mm');

        potrait_item.style.cssText = "width:"+(real_pwidth*2)/10+"mm;height:"+(real_pheight*2)/10+"mm;";
        landscape_item.style.cssText = "width:"+(real_lwidth*2)/10+"mm;height:"+(real_lheight*2)/10+"mm;";
        // potrait_item.style.cssText = "width:"+(paper_width.value*2)/10+"mm;height:"+(paper_height.value*2)/10+"mm;";
        // landscape_item.style.cssText = "width:"+(paper_height.value*2)/10+"mm;height:"+(paper_width.value*2)/10+"mm;";

        potrait_cons   = Math.ceil((jumlah_cetak.value/(potrait_col1+potrait_col2))*jumlah_file.value);
        landscape_cons = Math.ceil((jumlah_cetak.value/(landscape_col1+landscape_col2))*jumlah_file.value);

        potrait_result = potrait_col1+potrait_col2;
        landscape_result = landscape_col1+landscape_col2;


        if (potrait_result > landscape_result) {
            color_table(true, true, true, false);
            document.getElementById('base_potrait').classList.add('bg-comparison');
            document.getElementById('base_landscape').classList.remove('bg-comparison');
    
            shape_potrait = '';
            shape_landscape = 'bg-sec';
        }else if (potrait_result < landscape_result){
            color_table(true, true, false, true);
            document.getElementById('base_potrait').classList.remove('bg-comparison');
            document.getElementById('base_landscape').classList.add('bg-comparison');
            
            shape_potrait = 'bg-sec';
            shape_landscape = '';
        }else if((potrait_result == landscape_result) && ((potrait_result != 0) || (landscape_result != 0))){
            color_table(true, true, true, true);
            document.getElementById('base_potrait').classList.add('bg-comparison');
            document.getElementById('base_landscape').classList.add('bg-comparison');
        }else{
            color_table(true, true, false, false);
            document.getElementById('base_potrait').classList.remove('bg-comparison');
            document.getElementById('base_landscape').classList.remove('bg-comparison');
            shape_potrait = 'bg-sec';
            shape_landscape = 'bg-sec';
        }


        // result
        document.getElementById("potrait_result").innerHTML = potrait_result;
        document.getElementById("landscape_result").innerHTML = landscape_result;
        
        document.getElementById("potrait_row_col").innerHTML = "Potrait<br>Col: "+pwidth1+","+pwidth2+" - Row: "+lwidth1+","+lwidth2;
        document.getElementById("landscape_row_col").innerHTML = "Landscape<br>Col: "+pwidth1+","+pwidth2+" - Row: "+lwidth1+","+lwidth2;
        
        document.getElementById("potrait_qty").innerHTML = potrait_cons+" BESAR <br>("+side+" sisi)";
        document.getElementById("landscape_qty").innerHTML = landscape_cons+" BESAR <br>("+side+" sisi)";


    }else{
        console.log("BIASA");
        // susun biasa
    
        // jumlah kolom dan baris
        potrait_col = Math.floor(area_width.value/print_w);
        potrait_row = Math.floor(area_height.value/print_h);
        
        landscape_col = Math.floor(area_height.value/print_w);
        landscape_row = Math.floor(area_width.value/print_h);
    
        // hasil
        potrait_result = potrait_col*potrait_row;
        landscape_result = landscape_col*landscape_row;
        
        // area print
        area_pw = potrait_col*print_width.value;
        area_ph = potrait_row*print_height.value;
        area_lw = landscape_col*print_width.value;
        area_lh = landscape_row*print_height.value;
    
        // konsumsi bahan
        potrait_cons = Math.ceil((Math.ceil(jumlah_file.value/sisi_cetak.value)*jumlah_cetak.value)/potrait_result);
        landscape_cons = Math.ceil((Math.ceil(jumlah_file.value/sisi_cetak.value)*jumlah_cetak.value)/landscape_result);
        
        // return value infinity to zero
        (potrait_col == "Infinity") ? potrait_col = 0 : potrait_col;
        (potrait_row == "Infinity") ? potrait_row = 0 : potrait_row;
        (landscape_col == "Infinity") ? landscape_col = 0 : landscape_col;
        (landscape_row == "Infinity") ? landscape_row = 0 : landscape_row;
    
        (potrait_result == "Infinity") ? potrait_result = 0 : potrait_result;
        (landscape_result == "Infinity") ? landscape_result = 0 : landscape_result;
        
            
        if (potrait_result > landscape_result) {
            color_table(true, true, true, false);
            document.getElementById('base_potrait').classList.add('bg-comparison');
            document.getElementById('base_landscape').classList.remove('bg-comparison');
    
            shape_potrait = '';
            shape_landscape = 'bg-sec';
        }else if (potrait_result < landscape_result){
            color_table(true, true, false, true);
            document.getElementById('base_potrait').classList.remove('bg-comparison');
            document.getElementById('base_landscape').classList.add('bg-comparison');
            
            shape_potrait = 'bg-sec';
            shape_landscape = '';
        }else if((potrait_result == landscape_result) && ((potrait_result != 0) || (landscape_result != 0))){
            color_table(true, true, true, true);
            document.getElementById('base_potrait').classList.add('bg-comparison');
            document.getElementById('base_landscape').classList.add('bg-comparison');
        }else{
            color_table(true, true, false, false);
            document.getElementById('base_potrait').classList.remove('bg-comparison');
            document.getElementById('base_landscape').classList.remove('bg-comparison');
            shape_potrait = 'bg-sec';
            shape_landscape = 'bg-sec';
        }
    
        // define variable
        let potrait_item = document.getElementById("potrait_item");
        let landscape_item = document.getElementById("landscape_item");
    
        let bleed_border;
        (top_bottom.value > 0 ) ? bleed_border = 1 : bleed_border = 0;
    
        // loop gambar
        if (potrait_result || landscape_result) {
            potrait_item.style.cssText = "width:"+(area_pw*2)/10+"mm;height:"+(area_ph*2)/10+"mm;";
            landscape_item.style.cssText = "width:"+(area_lw*2)/10+"mm;height:"+(area_lh*2)/10+"mm;";
    
            count_p = 1;
            count_l = 1;
        
            let p_item = '';
            let l_item = '';
        
            for (let p_index = 1; p_index <= potrait_result; p_index++) {
                if (potrait_result > 200) {
                    switch (p_index) {
                        case 1:
                            count_p = 1;
                            break;
                        case potrait_result:
                            count_p = potrait_result;
                            break;
                        default:
                            count_p = "&#8226;";
                            break;
                    }
                }else{
                    count_p = p_index;
                }
                p_item += '<div class="shape-print '+shape_potrait+'" style="width:'+(print_width.value*2)/10+'mm;height:'+(print_height.value*2)/10+'mm;border:'+(bleed_border/2)+'mm solid white !important; background-clip:border-box">'+count_p+'</div>';
            }
        
            for (let l_index = 1; l_index <= landscape_result; l_index++) {
                if (landscape_result > 200) {
                    switch (l_index) {
                        case 1:
                            count_l = 1;
                            break;
                        case landscape_result:
                            count_l = landscape_result;
                            break;
                        default:
                            count_l = "&#8226;";
                            break;
                    }
                }else{
                    count_l = l_index;
                }
                l_item += '<div class="shape-print '+shape_landscape+'" style="width:'+(print_width.value*2)/10+'mm;height:'+(print_height.value*2)/10+'mm;border:'+(bleed_border/2)+'mm solid white !important; background-clip:border-box">'+count_l+'</div>';
            }
        
            potrait_item.innerHTML = p_item;
            landscape_item.innerHTML = l_item;
        }else{
            potrait_item.style.cssText = "";
            landscape_item.style.cssText = "";
    
            potrait_item.innerHTML = '<div class="shape-print bg-sec p-2">Invalid Input</div>';
            landscape_item.innerHTML = '<div class="shape-print bg-sec p-2">Invalid Input</div>';
        }
        // result
        document.getElementById("potrait_result").innerHTML = potrait_result;
        document.getElementById("landscape_result").innerHTML = landscape_result;
        
        document.getElementById("potrait_row_col").innerHTML = "Potrait<br>Col: "+potrait_col+" - Row: "+potrait_row;
        document.getElementById("landscape_row_col").innerHTML = "Landscape<br>Col: "+landscape_col+" - Row: "+landscape_row;
        
        document.getElementById("potrait_qty").innerHTML = potrait_cons+" BESAR <br>("+side+" sisi)";
        document.getElementById("landscape_qty").innerHTML = landscape_cons+" BESAR <br>("+side+" sisi)";
    }
    

    bentuk_susunan();

    // nama file
    var cst = (customer.value) ? customer.value : "Customer";
    var jdl = (judul_file.value) ? "_"+judul_file.value : "";
    var bhn = (bahan.value) ? "_"+bahan.value : "";
    var jlc;
    var sde;
    if (sisi_cetak.value == 4){
        sde = "BOOKLET";
        jlc = jumlah_cetak.value+" SET";
    }else{
        sde = side+"s";
        ((jumlah_file.value/side) > 1) ? jlc = "@"+jumlah_cetak.value+" KECIL" : jlc = jumlah_cetak.value+" KECIL";
    }

    var dpt;
    (potrait_result > 1 || landscape_result > 1) ? (potrait_result >= landscape_result) ? dpt = "_(1d"+potrait_result+" = "+jlc+")" : dpt = "_(1d"+landscape_result+" = "+jlc+")" : dpt = "_("+jlc+")";

    var fin, fin1, fin2, fin3;
    (finishing_1 != "") ? fin1 = finishing_1.value : "";
    (finishing_2 != "") ? fin2 = finishing_2.value : "";
    (finishing_3 != "") ? fin3 = finishing_3.value : "";

    if (fin1 == "" && fin2 == "" && fin3 == "") {
        fin = "_(TANPA FINISHING)";
    }else if (fin1 == "" && fin2 == ""){
        fin = "_("+fin3+")";
    }else if (fin2 == "" && fin3 == ""){
        fin = "_("+fin1+")";
    }else if (fin1 == "" && fin3 == ""){
        fin = "_("+fin2+")";
    }else if (fin1 == ""){
        fin = "_("+fin2+"+"+fin3+")";
    }else if (fin2 == ""){
        fin = "_("+fin1+"+"+fin3+")";
    }else if (fin3 == ""){
        fin = "_("+fin1+"+"+fin2+")";
    }else{
        fin = "_("+fin1+"+"+fin2+"+"+fin3+")";
    }

    var nota = (kode_nota.value) ? " ("+kode_nota.value+")" : "";

    var bsr = (potrait_result >=  landscape_result) ? potrait_cons : landscape_cons;
    document.getElementById('nama_file').innerHTML = cst+jdl+bhn+" "+sde+dpt+fin+" TOTAL = "+bsr+" BESAR ("+sde+")"+nota;

    document.getElementById("potrait_file_size").innerHTML = "Ukuran File : "+print_width.value/10+"x"+print_height.value/10+" cm"+" ("+potrait_result+" Pcs/Lbr)";
    document.getElementById("landscape_file_size").innerHTML = "Ukuran File : "+print_width.value/10+"x"+print_height.value/10+" cm"+" ("+landscape_result+" Pcs/Lbr)";
}

function copy(){
    let text = document.getElementById("nama_file").innerHTML;
    navigator.clipboard.writeText(text);
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case e.ctrlKey && 67:
            copy();
            break;
    }
    // e.preventDefault();
};

function reset() {
    document.getElementById("impose").reset();
    process();
}