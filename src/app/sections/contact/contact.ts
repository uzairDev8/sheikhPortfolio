
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  constructor(private cdr: ChangeDetectorRef) {}

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSending = false;
  statusMessage = '';

  async sendMessage() {
    this.isSending = true;
    this.statusMessage = '';
    this.cdr.detectChanges();

    try {
      await emailjs.send(
        'service_emailjsuzair21',
        'template_mmy4l5l',
        {
          name: this.formData.name,
          email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
        },
        {
          publicKey: 'blLTWGIbOKGsc8sLj',
        }
      );

      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };

      this.statusMessage = 'Message sent successfully! ✅';
    } catch (error) {
      console.error('EmailJS error:', error);
      this.statusMessage = 'Message failed to send. Please try again.';
    } finally {
      this.isSending = false;
      this.cdr.detectChanges();
    }
  }
}
