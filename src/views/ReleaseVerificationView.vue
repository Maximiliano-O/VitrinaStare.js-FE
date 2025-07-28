<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import GitHubCodeSandbox from '@/components/GitSB.vue';
import ColoredButton from '@/components/buttons/ColoredButton.vue';
import VerificationModal from '@/components/VerificationModal.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({ releaseID: String });
const { t } = useI18n();
const router = useRouter();

// State
const release = ref({});
const reviewerIDs = ref([]);
const statusID = ref('');
const status = ref({});
const allowed = ref(false);
const comentarioApruebo = ref('');
const comentarioRechazo = ref('');
const showApproveModal = ref(false);
const showRejectModal = ref(false);
const userID = localStorage.getItem('userID');

// Fetch release & reviewer IDs
const fetchRelease = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/release/${props.releaseID}`);
    release.value = data.result;
    reviewerIDs.value = data.result.statuses.map(s => s.reviewerID);
    allowed.value = reviewerIDs.value.includes(userID);
  } catch (err) {
    console.error('Error fetching release:', err);
  }
};

// Fetch current status for this reviewer
const fetchStatus = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_APP_EXPRESS_URL}/release/${props.releaseID}/${userID}/status`);
  statusID.value = data.result.statusId;
  status.value = data.result;
};

// Approve or reject actions
const updateStatus = async (isSafe, comments) => {
  await axios.put(`${import.meta.env.VITE_APP_EXPRESS_URL}/release/${props.releaseID}/status/${statusID.value}`, {
    isReviewed: true,
    isSafe,
    additionalComments: comments
  });
  router.push('/');
};

const apruebo = () => updateStatus(true, comentarioApruebo.value);
const rechazo = () => updateStatus(false, comentarioRechazo.value);

onMounted(async () => {
  await fetchRelease();
  await fetchStatus();
});
</script>

<template>
  <div v-if="allowed" class="verify-container">
    <div v-if="!status.isReviewed">
      <div class="header">
        <h1>{{ t('verifyRelease') }}</h1>
        <div class="button-pair">
          <ColoredButton variant="night" @click="showApproveModal = true">
            {{ t('approveRelease') }}
          </ColoredButton>
          <ColoredButton variant="wine" @click="showRejectModal = true">
            {{ t('rejectRelease') }}
          </ColoredButton>
        </div>
      </div>

      <div class="sandbox-container" v-if="release.codesandbox_URL">
        <GitHubCodeSandbox :url="release.codesandbox_URL" />
      </div>
      <div v-else>
        <p>Cargando sandbox...</p>
      </div>

      <!-- Approve Modal -->
      <VerificationModal
        :visible="showApproveModal"
        :title="t('verifyApprove')"
        :confirm-label="t('confirmApprove')"
        confirm-class="btn-primary"
        v-model:modelValue="comentarioApruebo"
        @confirm="apruebo"
        @update:visible="showApproveModal = $event"
      />

      <!-- Reject Modal -->
      <VerificationModal
        :visible="showRejectModal"
        :title="t('verifyReject')"
        :confirm-label="t('confirmReject')"
        confirm-class="btn-danger"
        v-model:modelValue="comentarioRechazo"
        @confirm="rechazo"
        @update:visible="showRejectModal = $event"
      />
    </div>

    <div v-else class="info-message">
      <h2>{{ t('alreadyVerified') }}</h2>
    </div>
  </div>

  <div v-else class="info-message">
    <h2>{{ t('accessDenied') }}</h2>
    <p>{{ t('accessDeniedMessage') }}</p>
  </div>
</template>

<style scoped>
.verify-container {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.button-pair {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.sandbox-container {
  margin: 20px 0;
}

.info-message {
  text-align: center;
  margin-top: 40px;
}
</style>