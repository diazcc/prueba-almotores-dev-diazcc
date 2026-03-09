<template>
    <DashboardTemplate :dataDashboardTemplate="dataDashboard"></DashboardTemplate>
</template>

<script setup lang="ts">

import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardTemplate from '../../templates/dashboard/Dashboard.template.vue';
import axios from 'axios';
import UserValidators from '../../../validators/UserValidators';

const router: any = useRouter();

const dataDashboard = reactive({
    dataTableCorrespondenceEntry: {
        dataTitle: {
            text: "correspondence",
            classTitle: "",
        },
        stateLoadData: false,
        data: {
            className: 'list',
            lists: [],
            onClick: () => {
            }

        },
        dataText: {
            text: 'latest_entry_filings',
            classText: "italic-small",

        }
    },
    dataTableCorrespondenceInternal: {
        dataTitle: {
            text: "correspondence",
            classTitle: "",
        },
        stateLoadData: false,
        data: {
            className: 'list',
            lists: [],
            onClick: () => {
            }

        },
        dataText: {
            text: 'latest_internal_filings',
            classText: "italic-small",

        }
    },
    dataColaborativeWork: {
        dataTitle: {
            text: "colaborative_work",
            classTitle: "",
        },
        dataText: {
            text: "start_colaborative_work",
            classText: "light",
        },
        dataButton: {
            text: "start",
            className: "blue",

        }
    },
    dataCalendarWidget: {
        dataTitle: {
            text: "calendar",
            classText: "",
        }
    },
    dataStatistic: {
        dataTitle: {
            text: "statistics",
            classText: "",
        },
        dataChartPie: {
            className: 'list',
            data: [],
            onClick: () => {
                router.push("")
            }
        }
    }
})

onMounted(() => {
    callServices();
})

function callServices() {
    getUsers();
}

function getUsers() {
    dataDashboard.dataTableCorrespondenceInternal.stateLoadData = true;
    
    axios.get('http://127.0.0.1:8000/users', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('idToken')}`
        }
    })
    .then((response: any) => {
        dataDashboard.dataTableCorrespondenceInternal.data.lists = response.data.users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email
        }));
        dataDashboard.dataTableCorrespondenceInternal.stateLoadData = false;
    })
    .catch((error: any) => {
        console.error('Error fetching users:', error);
        dataDashboard.dataTableCorrespondenceInternal.stateLoadData = false;
    });
}

</script>

<style scoped src="./Dashboard.page.scss"></style>