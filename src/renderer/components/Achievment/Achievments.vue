<template>
  <div class="achievments">
    <div class="achievment-chapter">
      <h3>Dokončené</h3>
      <div class="achievment" v-for="(achievment,index) in finished" :key="index">
        <app-achievment :achievment="achievment" :active="true"/>
      </div>
    </div>
    <div style="clear:both;"></div>
    <div class="achievment-chapter">
      <h3>Nedokončené</h3>
      <div
        class="achievment achievment-not-finished"
        v-for="(achievment,index) in unfinished"
        :key="index"
      >
        <app-achievment :achievment="achievment" :active="false"/>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>
<script>
import AppAchievment from "./Achievment";
export default {
  components: {
    AppAchievment
  },
  data() {
    return {
      finished: [],
      unfinished: []
    };
  },
  methods: {
    setStatistics(statistics) {
      var tutorialAchievment = {
        title: "Znalec",
        text: "Dokončení návodu"
      };
      if (statistics.tutorial) {
        this.finished.push(tutorialAchievment);
      } else {
        this.unfinished.push(tutorialAchievment);
      }
      var completed =
        statistics.easy.completed +
        statistics.standard.completed +
        statistics.hard.completed;
      this.addAchievments(
        [
          "Řeším občas",
          "Řeším často",
          "Rěším denně",
          "Řeším kde se dá",
          "Řesím dnem i nocí"
        ],
        "Celkově dokončeno",
        completed
      );
      this.addAchievments(
        [
          "První krůčky",
          "Už ti to jde",
          "Nepolevuj",
          "Levou zadní",
          "Vzhůru na střední"
        ],
        "Dokončeno na snadnou obtížnost",
        statistics.easy.completed
      );
      this.addAchievments(
        [
          "Střední výzva",
          "Pokrok středem",
          "Už si to dáváš",
          "Půlka za mnou",
          "Vzhůru na těžkou"
        ],
        "Dokončeno na střední obtížnost",
        statistics.standard.completed
      );
      this.addAchievments(
        [
          "Těžké začátky",
          "Pomalu ale jistě",
          "Tohle má být těžké?",
          "Zvládáš to jak nic",
          "Ostřílený řešitel"
        ],
        "Dokončeno na těžkou obtížnost",
        statistics.hard.completed
      );
    },
    addAchievments(titles, text, actual) {
      if (actual >= 5) {
        this.finished.push({ title: titles[0], text: text + " 5 her" });
      } else {
        this.unfinished.push({ title: titles[0], text: text + " 5 her" });
      }
      if (actual >= 10) {
        this.finished.push({ title: titles[1], text: text + " 10 her" });
      } else {
        this.unfinished.push({ title: titles[1], text: text + " 10 her" });
      }
      if (actual >= 25) {
        this.finished.push({ title: titles[2], text: text + " 25 her" });
      } else {
        this.unfinished.push({ title: titles[2], text: text + " 25 her" });
      }
      if (actual >= 50) {
        this.finished.push({ title: titles[3], text: text + " 50 her" });
      } else {
        this.unfinished.push({ title: titles[3], text: text + " 50 her" });
      }
      if (actual >= 100) {
        this.finished.push({ title: titles[4], text: text + " 100 her" });
      } else {
        this.unfinished.push({ title: titles[4], text: text + " 100 her" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.achievments {
  &-chapter {
    display: block;
  }
  padding: 20px 0;
}
.achievment {
  margin: 5px;
  float: left;
}
.achievment-not-finished {
  & > .achievment {
    color: gray;
    border-color: gray;
  }
}
</style>
