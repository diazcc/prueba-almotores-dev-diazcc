<template>
  <section class="table-correspondence-dashboard-content">
    <table class="table">
      <thead class="table__row table--header">
        <th class="table__row__cell">{{ t('item') }}</th>
        <th class="table__row__cell">{{ t('name') }}</th>
        <th class="table__row__cell">{{ t('email') }}</th>
      </thead>
      <tbody class="table__row table--only-row loading-component" v-if="dataTableCorrespondenceDashboard.stateLoadData">
        <td class=" table__row__cell">{{ t('loading') }}</td>
      </tbody>
      <tbody class="table__row table--only-row" v-else-if="dataTableCorrespondenceDashboard.data.lists.length < 1">
        <td class=" table__row__cell">{{ t('no_results_found') }}</td>
      </tbody>
      <tbody v-else class=" table__row" v-for="(element, index) in dataTableCorrespondenceDashboard.data.lists"
        :key="element.id">
        <td class="table__row__cell">{{ index + 1 }}</td>
        <td class="table__row__cell table__row__cell--left-align">{{ element?.name }}</td>
        <td class="table__row__cell table__row__cell--left-align">{{ element?.email }}</td>
      </tbody>
    </table>
  </section>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineProps(["dataTableCorrespondenceDashboard"]);
</script>

<style scoped src="./TableCorrespondenceDashboard.organism.scss"></style>