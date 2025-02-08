// public/static/client.js
async function submitPost(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      title: form.title.value,
      content: form.content.value
    };
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        window.location.href = '/';
      } else {
        alert('Post submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred');
    }
    return false;
  }
  