<!-- 
  TODO IMPORTANT: THIS COMPONENT MUST BE IMPROVE ABOUT STYLES AND STRUCTURE OF COMPONENTS

  ?ISSUES:

  *Redesign view about 

  !DON'T WORK WITH THIS COMPONENT BEFORE CHECK ALL ISSUES 
-->

<template>
  <section class="dashboard">
    <article class="dashboard__widget">
      <header class="dashboard__widget__header">
        <h1 class="dashboard__widget_header__title">
          {{ t("users") }}
        </h1>
      </header>
      <TableCorrespondenceDashboard
        :dataTableCorrespondenceDashboard="
          dataDashboardTemplate.dataTableCorrespondenceInternal
        "
      />
    </article>
  </section>
</template>

<script setup lang="ts">
import TableCorrespondenceDashboard from "../../organisms/table-correspondence-dashboard/TableCorrespondenceDashboard.organism.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps(["dataDashboardTemplate"]);
</script>

<style scoped src="./Dashboard.template.scss"></style>
