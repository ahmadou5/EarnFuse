export const handleCopy = (value) => {
    navigator.clipboard.writeText(value).then(
      () => {
        console.log("Copied to clip Board");
      },
      (err) => {
        // Failed to copy to clipboard
        console.error("Could not copy: ", err);
      }
    );
  };