var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FetchData {
    /**
     * Va chercher les tâches sur le serveur json-server en exécutant une requête http avec le verbe GET
     * @returns Promise<Task[]>
     */
    static loadTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(FetchData.url)
                .then(response => {
                if (response.status != 200) {
                    throw new Error("Pb dans loadTasks");
                }
                else
                    return response.json();
            })
                .then(tasks => {
                console.log(`tasks :`, tasks);
                return tasks;
            })
                .catch(error => {
                console.log(`Erreur attrapée` + error);
            });
        });
    }
    /**
     * Ajoute une tâche sur le serveur json-server en exécutant une requête http avec le verbe POST
     * @returns Promise<Task>
     */
    static addTask(new_task) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(FetchData.url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(new_task)
            })
                .then(response => {
                console.log(`status dans le post`, response.status);
                if (response.status != 201) {
                    throw new Error("Pb dans addTask");
                }
                else
                    return response.json();
            })
                .then(task => {
                console.log(`task retournée après un post :`, task);
                return task;
            })
                .catch(error => {
                console.log(`Erreur attrapée dans addTask` + error);
            });
        });
    }
    static patchTask(id, updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch(`${FetchData.url}/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify(updatedTask)
            })
                .then(response => {
                if (response.status != 200) {
                    throw new Error("Pb dans patchTask");
                }
                else
                    return response.json();
            })
                .then(task => {
                console.log(`Task updated:`, task);
                return task;
            })
                .catch(error => {
                console.log(`Error caught in patchTask: ` + error);
            });
        });
    }
}
FetchData.url = 'http://localhost:3000/tasks';
export default FetchData;
