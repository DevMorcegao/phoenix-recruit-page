/**
 * Rate Limiter for Form Submissions
 * 
 * Rules:
 * - Maximum 2 submissions per day (24 hours)
 * - Minimum 5 minutes between submissions
 * 
 * Uses localStorage to track submission timestamps
 */

const STORAGE_KEY = 'phoenix_form_submissions';
const MAX_SUBMISSIONS_PER_DAY = 2;
const MIN_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes in milliseconds
const DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface Submission {
  timestamp: number;
}

/**
 * Get all submissions from localStorage
 */
function getSubmissions(): Submission[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const submissions: Submission[] = JSON.parse(data);
    
    // Filter out submissions older than 24 hours
    const now = Date.now();
    const recentSubmissions = submissions.filter(
      (sub) => now - sub.timestamp < DAY_MS
    );
    
    // Update storage if we filtered anything out
    if (recentSubmissions.length !== submissions.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSubmissions));
    }
    
    return recentSubmissions;
  } catch (error) {
    console.error('Error reading submissions from localStorage:', error);
    return [];
  }
}

/**
 * Save submissions to localStorage
 */
function saveSubmissions(submissions: Submission[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Error saving submissions to localStorage:', error);
  }
}

/**
 * Check if user can submit a form
 * Returns an object with canSubmit boolean and optional error message
 */
export function canSubmitForm(): {
  canSubmit: boolean;
  message?: string;
  waitTimeMs?: number;
} {
  const submissions = getSubmissions();
  const now = Date.now();
  
  // Check if we've reached the daily limit
  if (submissions.length >= MAX_SUBMISSIONS_PER_DAY) {
    const oldestSubmission = submissions[0];
    const timeUntilReset = DAY_MS - (now - oldestSubmission.timestamp);
    
    return {
      canSubmit: false,
      message: `Você atingiu o limite de ${MAX_SUBMISSIONS_PER_DAY} formulários por dia. Tente novamente em ${formatTimeRemaining(timeUntilReset)}.`,
      waitTimeMs: timeUntilReset,
    };
  }
  
  // Check if minimum interval has passed since last submission
  if (submissions.length > 0) {
    const lastSubmission = submissions[submissions.length - 1];
    const timeSinceLastSubmission = now - lastSubmission.timestamp;
    
    if (timeSinceLastSubmission < MIN_INTERVAL_MS) {
      const timeUntilNextSubmission = MIN_INTERVAL_MS - timeSinceLastSubmission;
      
      return {
        canSubmit: false,
        message: `Aguarde ${formatTimeRemaining(timeUntilNextSubmission)} antes de enviar outro formulário.`,
        waitTimeMs: timeUntilNextSubmission,
      };
    }
  }
  
  return { canSubmit: true };
}

/**
 * Record a successful submission
 */
export function recordSubmission(): void {
  const submissions = getSubmissions();
  submissions.push({ timestamp: Date.now() });
  saveSubmissions(submissions);
}

/**
 * Format milliseconds into a human-readable time string
 */
function formatTimeRemaining(ms: number): string {
  const minutes = Math.ceil(ms / 60000);
  
  if (minutes < 60) {
    return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hora${hours > 1 ? 's' : ''}`;
  }
  
  return `${hours} hora${hours > 1 ? 's' : ''} e ${remainingMinutes} minuto${remainingMinutes > 1 ? 's' : ''}`;
}

/**
 * Get submission statistics (for debugging/admin purposes)
 */
export function getSubmissionStats() {
  const submissions = getSubmissions();
  return {
    count: submissions.length,
    submissions,
    canSubmit: canSubmitForm(),
  };
}
