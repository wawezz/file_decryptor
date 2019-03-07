Usage example:
````
import voicenter_file_decryptor from "voicenter_file_decryptor";

    let file;

    voicenter_file_decryptor
      .decrypt(
        "http://file.lc",
        {
          algorithm: "aes256",
          mimeType: "audio/mp3",
          chunkSize: 1024 * 1024
        }
      )
      .then(audioBase64 => {
        file = audioBase64;
      });
````
