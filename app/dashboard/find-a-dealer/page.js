const page = () => {
  return (
    <div className="h-dvh">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1850510.178590905!2d132.62609372929919!3d-25.058575479713983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b2e4d1e4b108a95%3A0x40217a82a254470!2sGhan%20NT%200872%2C%20Australia!5e0!3m2!1sen!2sbd!4v1716486609324!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        // style={{ height: "100dvh", width: "1000px" }}
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default page;
