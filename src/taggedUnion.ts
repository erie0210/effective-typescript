interface UploadEvent {
    type: 'upload';
    filename: string;
    content: string;
}

interface DownloadEvent {
    type: 'download';
    filename: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(event: AppEvent) {
    switch (event.type) {
        case "download":
            console.log(event.filename);
            break;
        case "upload":
            console.log(event.filename, event.content);
            break;
    }
}


