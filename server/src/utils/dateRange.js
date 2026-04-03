export function parseDays(days) {
  const parsed = Number(days);
  return [30, 60, 90, 120].includes(parsed) ? parsed : 30;
}

export function getRangeStart(days) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - (days - 1));
  return date;
}

export function isWithinDays(dateString, days) {
  return new Date(dateString) >= getRangeStart(days);
}

export function isPast(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateString) < today;
}

export function formatBucketLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function bucketSalesData(items, bucketCount = 10) {
  if (!items.length) {
    return Array.from({ length: bucketCount }, (_, index) => ({
      date: `${index + 1}`,
      amount: 0,
    }));
  }

  const sortedItems = [...items].sort((left, right) => {
    return new Date(left.date) - new Date(right.date);
  });

  const buckets = Array.from({ length: bucketCount }, () => []);

  sortedItems.forEach((item, index) => {
    const bucketIndex = Math.min(
      bucketCount - 1,
      Math.floor((index / sortedItems.length) * bucketCount)
    );
    buckets[bucketIndex].push(item);
  });

  return buckets.map((bucket, index) => {
    if (!bucket.length) {
      return {
        date: `${index + 1}`,
        amount: 0,
      };
    }

    const amount = bucket.reduce((sum, item) => sum + Number(item.amount), 0);
    return {
      date: formatBucketLabel(bucket[bucket.length - 1].date),
      amount,
    };
  });
}
