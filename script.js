// ===============================
// ELEMENT
// ===============================

const todo = document.getElementById("todo");
const doing = document.getElementById("doing");
const done = document.getElementById("done");

const recapBtn = document.getElementById("recapBtn");
const aiBtn = document.getElementById("aiBtn");

const summary = document.getElementById("summary");
const weeklySummary = document.getElementById("weeklySummary");
const monthlySummary = document.getElementById("monthlySummary");

let draggedTask = null;

// ===============================
// DRAG & DROP
// ===============================

function initDrag() {

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {

        task.addEventListener("dragstart", () => {

            draggedTask = task;

            setTimeout(() => {

                task.style.display = "none";

            }, 0);

        });

        task.addEventListener("dragend", () => {

            task.style.display = "block";

            draggedTask = null;

            updateCounter();

            updateChart();

        });

    });

}

document.querySelectorAll(".task-list").forEach(column => {

    column.addEventListener("dragover", e => {

        e.preventDefault();

    });

    column.addEventListener("drop", () => {

        if (draggedTask) {

            column.appendChild(draggedTask);

        }

    });

});

// ===============================
// COUNTER
// ===============================

function updateCounter() {

    document.getElementById("todo-count").innerText =
        todo.querySelectorAll(".task").length;

    document.getElementById("doing-count").innerText =
        doing.querySelectorAll(".task").length;

    document.getElementById("done-count").innerText =
        done.querySelectorAll(".task").length;

}

updateCounter();

// ===============================
// ADD TASK
// ===============================

document.querySelectorAll(".add-task").forEach(button => {

    button.addEventListener("click", () => {

        const title = prompt("Masukkan nama pekerjaan");

        if (!title) return;

        const task = document.createElement("div");

        task.className = "task";

        task.draggable = true;

        task.innerHTML = `

            <h4>${title}</h4>

            <small>${new Date().toLocaleDateString()}</small>

        `;

        button.previousElementSibling.appendChild(task);

        initDrag();

        updateCounter();

        updateChart();

    });

});

// ===============================
// CHART
// ===============================

const weeklyChart = new Chart(
    document.getElementById("weeklyChart"),
    {
        type: "pie",

        data: {

            labels: ["To Do", "Doing", "Done"],

            datasets: [{

                data: [3,2,3],

                backgroundColor: [

                    "#f59e0b",
                    "#2563eb",
                    "#16a34a"

                ]

            }]

        },

        options: {

            responsive:true,

            plugins:{

                legend:{
                    position:"bottom"
                }

            }

        }

    }

);

const monthlyChart = new Chart(
    document.getElementById("monthlyChart"),
    {
        type:"doughnut",

        data:{

            labels:["To Do","Doing","Done"],

            datasets:[{

                data:[3,2,3],

                backgroundColor:[
                    "#f59e0b",
                    "#2563eb",
                    "#16a34a"
                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    }

);

// ===============================
// UPDATE CHART
// ===============================

function updateChart(){

    const todoCount = todo.querySelectorAll(".task").length;
    const doingCount = doing.querySelectorAll(".task").length;
    const doneCount = done.querySelectorAll(".task").length;

    weeklyChart.data.datasets[0].data = [

        todoCount,
        doingCount,
        doneCount

    ];

    monthlyChart.data.datasets[0].data = [

        todoCount,
        doingCount,
        doneCount

    ];

    weeklyChart.update();

    monthlyChart.update();

}

updateChart();

// ===============================
// AI SUMMARY
// ===============================

function generateSummary(){

    const todoCount = todo.querySelectorAll(".task").length;
    const doingCount = doing.querySelectorAll(".task").length;
    const doneCount = done.querySelectorAll(".task").length;

    let text = "";

    text += `Saat ini terdapat ${todoCount} pekerjaan yang belum dimulai. `;

    text += `${doingCount} pekerjaan sedang dikerjakan. `;

    text += `${doneCount} pekerjaan telah selesai. `;

    if(doneCount >= doingCount && doneCount >= todoCount){

        text += "🎉 Produktivitas tim sangat baik minggu ini.";

    }else if(todoCount > doneCount){

        text += "⚠ Banyak pekerjaan masih berada pada tahap To Do.";

    }else{

        text += "📈 Progres pekerjaan berjalan dengan baik.";

    }

    return text;

}

// ===============================
// RECAP
// ===============================

function doRecap(){

    const todoCount = todo.querySelectorAll(".task").length;
    const doingCount = doing.querySelectorAll(".task").length;
    const doneCount = done.querySelectorAll(".task").length;

    const total = todoCount + doingCount + doneCount;

    summary.innerHTML = generateSummary();

    weeklySummary.innerHTML = `

    <b>Total Task :</b> ${total}<br><br>

    ✅ Done : ${doneCount}<br>

    🔄 Doing : ${doingCount}<br>

    📋 To Do : ${todoCount}<br><br>

    Progress pekerjaan minggu ini menunjukkan bahwa
    ${doneCount} pekerjaan telah berhasil diselesaikan.

    `;

    monthlySummary.innerHTML = `

    <b>Laporan Bulanan</b><br><br>

    Total pekerjaan bulan ini sebanyak <b>${total}</b> task.

    <br><br>

    Persentase penyelesaian:

    <br><br>

    ${(doneCount/total*100).toFixed(1)}% pekerjaan selesai.

    `;

}

recapBtn.addEventListener("click",doRecap);

aiBtn.addEventListener("click",doRecap);

// ===============================
// INIT
// ===============================

initDrag();

updateCounter();

updateChart();// ===============================
// ELEMENT
// ===============================

const todo = document.getElementById("todo");
const doing = document.getElementById("doing");
const done = document.getElementById("done");

const recapBtn = document.getElementById("recapBtn");
const aiBtn = document.getElementById("aiBtn");

const summary = document.getElementById("summary");
const weeklySummary = document.getElementById("weeklySummary");
const monthlySummary = document.getElementById("monthlySummary");

let draggedTask = null;

// ===============================
// DRAG & DROP
// ===============================

function initDrag() {

    const tasks = document.querySelectorAll(".task");

    tasks.forEach(task => {

        task.addEventListener("dragstart", () => {

            draggedTask = task;

            setTimeout(() => {

                task.style.display = "none";

            }, 0);

        });

        task.addEventListener("dragend", () => {

            task.style.display = "block";

            draggedTask = null;

            updateCounter();

            updateChart();

        });

    });

}

document.querySelectorAll(".task-list").forEach(column => {

    column.addEventListener("dragover", e => {

        e.preventDefault();

    });

    column.addEventListener("drop", () => {

        if (draggedTask) {

            column.appendChild(draggedTask);

        }

    });

});

// ===============================
// COUNTER
// ===============================

function updateCounter() {

    document.getElementById("todo-count").innerText =
        todo.querySelectorAll(".task").length;

    document.getElementById("doing-count").innerText =
        doing.querySelectorAll(".task").length;

    document.getElementById("done-count").innerText =
        done.querySelectorAll(".task").length;

}

updateCounter();

// ===============================
// ADD TASK
// ===============================

document.querySelectorAll(".add-task").forEach(button => {

    button.addEventListener("click", () => {

        const title = prompt("Masukkan nama pekerjaan");

        if (!title) return;

        const task = document.createElement("div");

        task.className = "task";

        task.draggable = true;

        task.innerHTML = `

            <h4>${title}</h4>

            <small>${new Date().toLocaleDateString()}</small>

        `;

        button.previousElementSibling.appendChild(task);

        initDrag();

        updateCounter();

        updateChart();

    });

});

// ===============================
// CHART
// ===============================

const weeklyChart = new Chart(
    document.getElementById("weeklyChart"),
    {
        type: "pie",

        data: {

            labels: ["To Do", "Doing", "Done"],

            datasets: [{

                data: [3,2,3],

                backgroundColor: [

                    "#f59e0b",
                    "#2563eb",
                    "#16a34a"

                ]

            }]

        },

        options: {

            responsive:true,

            plugins:{

                legend:{
                    position:"bottom"
                }

            }

        }

    }

);

const monthlyChart = new Chart(
    document.getElementById("monthlyChart"),
    {
        type:"doughnut",

        data:{

            labels:["To Do","Doing","Done"],

            datasets:[{

                data:[3,2,3],

                backgroundColor:[
                    "#f59e0b",
                    "#2563eb",
                    "#16a34a"
                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    }

);

// ===============================
// UPDATE CHART
// ===============================

function updateChart(){

    const todoCount = todo.querySelectorAll(".task").length;
    const doingCount = doing.querySelectorAll(".task").length;
    const doneCount = done.querySelectorAll(".task").length;

    weeklyChart.data.datasets[0].data = [

        todoCount,
        doingCount,
        doneCount

    ];

    monthlyChart.data.datasets[0].data = [

        todoCount,
        doingCount,
        doneCount

    ];

    weeklyChart.update();

    monthlyChart.update();

}

updateChart();

// ===============================
// AI SUMMARY
// ===============================

function generateSummary(){

    const todoCount = todo.querySelectorAll(".task").length;
    const doingCount = doing.querySelectorAll(".task").length;
    const doneCount = done.querySelectorAll(".task").length;

    let text = "";

    text += `Saat ini terdapat ${todoCount} pekerjaan yang belum dimulai. `;

    text += `${doingCount} pekerjaan sedang dikerjakan. `;

    text += `${doneCount} pekerjaan telah selesai. `;

    if(doneCount >= doingCount && doneCount >= todoCount){

        text += "🎉 Produktivitas tim sangat baik minggu ini.";

    }else if(todoCount > doneCount){

        text += "⚠ Banyak pekerjaan masih berada pada tahap To Do.";

    }else{

        text += "📈 Progres pekerjaan berjalan dengan baik.";

    }

    return text;

}

// ===============================
// RECAP
// ===============================

function doRecap(){

    const todoCount = todo.querySelectorAll(".task").length;
    const doingCount = doing.querySelectorAll(".task").length;
    const doneCount = done.querySelectorAll(".task").length;

    const total = todoCount + doingCount + doneCount;

    summary.innerHTML = generateSummary();

    weeklySummary.innerHTML = `

    <b>Total Task :</b> ${total}<br><br>

    ✅ Done : ${doneCount}<br>

    🔄 Doing : ${doingCount}<br>

    📋 To Do : ${todoCount}<br><br>

    Progress pekerjaan minggu ini menunjukkan bahwa
    ${doneCount} pekerjaan telah berhasil diselesaikan.

    `;

    monthlySummary.innerHTML = `

    <b>Laporan Bulanan</b><br><br>

    Total pekerjaan bulan ini sebanyak <b>${total}</b> task.

    <br><br>

    Persentase penyelesaian:

    <br><br>

    ${(doneCount/total*100).toFixed(1)}% pekerjaan selesai.

    `;

}

recapBtn.addEventListener("click",doRecap);

aiBtn.addEventListener("click",doRecap);

// ===============================
// INIT
// ===============================

initDrag();

updateCounter();

updateChart();