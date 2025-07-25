useEffect(() => {
        if(!user) {
            router.replace('/sign-in')
            return
        }

        if(!scenario) {
            toast("Event has been created")
            router.replace("/conversation")
            return
        }
        
        const vapiInstance = new Vapi('48c46a80-d52f-482f-91ae-6c8fbeb10b00');
        setVapi(vapiInstance)
        

        function onMessage(message: Message) {
            console.log("hello")
            console.log("assistant" + (message.type === "transcript" && message.role === "assistant"))
            if ((message.type === "transcript" && message.role === "assistant")
                || (message.type === "transcript" && message.role === "user" && message.transcriptType === "final")) {
                console.log(message)
                setMessages(prevMessages => {
                        // If this is the first message
                    if (prevMessages.length === 0) {
                        return [message];
                    }
                    
                    const lastMessage = prevMessages[prevMessages.length - 1];
                    
                    // if last message role is user, transcript has to be final, then add that to a variable with space,          IF IS USER === USER ☑️🤷🏾‍♂️

                    // but if message role is now assistant and last was user, the user variable should be equals to empty    IF IS USER === ASSISTANT ☑️🤷🏾‍♂️

                    // if lastMessage.role === message.role is assistant, perferm the logic as usual   IF IS ASSISTANT === ASSISTANT ☑️

                    // if prev was assistant and new is user, then do the else logic     IF IS ASSISTANT === USER ☑️

                    // If the last message is from the same role, update it
                    if (lastMessage.role && message.role === "assistant") {
                        // Replace the last message with the new one
                        return [
                            ...prevMessages.slice(0, -1),
                            message
                        ];
                    } else if (lastMessage.role && message.role === "user") {
                        userMessage.current = userMessage.current.length === 0? lastMessage.transcript : userMessage.current + " " + lastMessage.transcript;
                        const newUserMessage = {
                            type: message.type,
                            transcript: userMessage.current,
                            role: message.role,
                            transcriptType: message.transcriptType
                        }
                        return [
                            ...prevMessages.slice(0, -1),
                            newUserMessage
                        ];
                    } else {
                        userMessage.current = ""
                        // Add new message from different role
                        return [...prevMessages, message];
                    }
                });
            }

            // vapi?.on('message', (message) => {
            // //console.log(message)
            //     if (message.type === 'transcript') {
            //         // if (messages.length === 0) {
            //         //     setMessages([message])
            //         // } else {
            //         //     if (messages[messages.length - 1].role === message.role) {
            //         //         const type = messages[messages.length - 1].type
            //         //         const role = messages[messages.length - 1].role
            //         //         const transcriptType = messages[messages.length - 1].transcriptType
            //         //         setMessages(m => [...m, {type, role, transcriptType, transcript: message.transcript}])
            //         //     } else {
            //         //         setMessages(m => [...m, message])
            //         //     }
            //         // }
            //         //console.log(`${message.role}: ${message.transcript}`);
            //         console.log(message)
            //         setMessages(prevMessages => {
            //                 // If this is the first message
            //             if (prevMessages.length === 0) {
            //                 return [message];
            //             }
                        
            //             const lastMessage = prevMessages[prevMessages.length - 1];
                        
            //             // If the last message is from the same role, update it
            //             if (lastMessage.role === message.role) {
            //                 // Replace the last message with the new one
            //                 return [
            //                     ...prevMessages.slice(0, -1),
            //                     message
            //                 ];
            //             } else {
            //                 // Add new message from different role
            //                 return [...prevMessages, message];
            //             }
            //         });
            //     }
            // });
        }
    //     vapi.on('message', (msg) => {
    //        if (msg.type === 'transcript' && msg.transcriptType === "final") {
    //            setMessages((prev) => [...prev, msg]); // append new chunk
    //        }
    //    });

       // cleanup on unmount
       //return () => vapi.off('message');
        // vapi.on('call-start', onCallStart);
        // vapi.on('call-end', onCallEnd);
        vapiInstance.on('message', onMessage);
        // vapi.on('error', onError);
        // vapi.on('speech-start', onSpeechStart);
        // vapi.on('speech-end', onSpeechEnd);

        vapiInstance.start(gender, assistantOverrides) 
        return () => {
            // vapi.off('call-start', onCallStart);
            // vapi.off('call-end', onCallEnd);
            vapiInstance.off('message', onMessage);
            // vapi.off('error', onError);
            // vapi.off('speech-start', onSpeechStart);
            // vapi.off('speech-end', onSpeechEnd);
        }
    }, [])