import { useToast } from "~/hooks/use-toast";

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const copyToureLink = (id: string) => {
  const { toast } = useToast()
  const link = `${window.origin}/toure/${id}`
  navigator.clipboard.writeText(link);
  toast.copied({ message: 'URL Copied successfully' })
}


export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function isValidDateFormat(dateString: string) {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegex.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  return (
    date.getFullYear() === parseInt(year) &&

    date.getMonth() + 1 === parseInt(month) &&
    date.getDate() === parseInt(day)
  );
}

export function formatDate(inputDate: Date) {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const day = date.getDate();
  let daySuffix;
  if (day >= 11 && day <= 13) {
    daySuffix = 'th';
  } else {
    switch (day % 10) {
      case 1:
        daySuffix = 'st';
        break;
      case 2:
        daySuffix = 'nd';
        break;
      case 3:
        daySuffix = 'rd';
        break;
      default:
        daySuffix = 'th';
    }
  }

  return `${day}${daySuffix}, ${formattedDate}`;
}

export const isEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function formatTimeElapsed(createdAt: Date) {
  const elapsed = Date.now() - new Date(createdAt).getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}

export function openUrl(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.click()
} 
