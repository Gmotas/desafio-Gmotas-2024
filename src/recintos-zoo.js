/**
 * Projeto: Desafio Zoológico
 * Autor: Gabriel Mota Silva
 * GitHub: https://github.com/Gmotas
 * Data: 06/09/2024
 * Finalizado ás 18:38
 */
class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 2 }] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const { tamanho, bioma, carnivoro } = this.animais[animal];
    const espacoNecessario = quantidade * tamanho;
    let recintosViaveis = [];

    this.recintos.forEach((recinto) => {
      let espacoOcupado = recinto.animais.reduce((acc, a) => acc + (a.quantidade * this.animais[a.especie].tamanho), 0);
      const especiesNoRecinto = new Set(recinto.animais.map(a => a.especie));

      // Verifica bioma compatível
      if (!bioma.includes(recinto.bioma) && !(recinto.bioma.includes('savana') && bioma.includes('savana'))) {
        return; // Pula se o bioma não for compatível
      }

      // Verifica se há carnívoros
      const temCarnivoro = recinto.animais.some(a => this.animais[a.especie].carnivoro);
      if (temCarnivoro && carnivoro === false) {
        return; // Bloqueia se houver carnívoros e o animal for herbívoro
      }

      // Calcula espaço disponível e aplica espaço extra para múltiplas espécies
      const espacoDisponivel = recinto.tamanho - espacoOcupado;
      const espacoExtra = especiesNoRecinto.size > 0 ? 1 : 0; // Adiciona 1 de espaço extra se houver mais de uma espécie
      const espacoNecessarioTotal = espacoNecessario + espacoExtra;

      if (espacoDisponivel >= espacoNecessarioTotal) {
        recintosViaveis.push({
          recinto: recinto.numero,
          espacoLivre: espacoDisponivel - espacoNecessarioTotal,
          total: recinto.tamanho
        });
      }
    });

    // Ordena os recintos viáveis pelo número
    recintosViaveis.sort((a, b) => a.recinto - b.recinto);

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis: recintosViaveis.map(r => `Recinto ${r.recinto} (espaço livre: ${r.espacoLivre} total: ${r.total})`) };
  }
}

export { RecintosZoo };
