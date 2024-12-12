import {AfterViewInit, Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {loadScript} from '@paypal/paypal-js';
import {ProjectService} from '../../services/project.service';
import {NgIf} from '@angular/common';
import {ContributionService} from '../../services/contribution-service.service';
import {AuthService} from '../../services/auth-service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements AfterViewInit {
  paymentForm: FormGroup;
  projectName: string = '';
  @Input() projectId: number = 0;
  isPayPalVisible = false;
  user_id:number = 0;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private projectService: ProjectService, private contributionService: ContributionService, private authService: AuthService) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.projectName = project.title;
    });
    this.authService.status().subscribe(
      (response) => {
        this.user_id = response.user.id;
      })
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const amount = this.paymentForm.value.amount;
      this.isPayPalVisible = true;
      this.renderPayPalButton(amount);
    }
  }

  private renderPayPalButton(amount: string) {
    loadScript({clientId: 'ATZShYuc965llu5Xllq45QpFb1I0cETTDZRf--Nt4ZGgmqci9ufnKLy2QWVP5fRme4BnodSVJdr3kg0n'})
      .then((paypal) => {
        if (!paypal || !paypal.Buttons) {
          console.error('PayPal SDK не загрузился');
          return;
        }

        paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                amount: {
                  currency_code: 'USD',
                  value: amount, // Используем сумму из формы
                },
              }],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order?.capture();
              alert(`Транзакция завершена. Покупатель: ${details?.payer?.name?.given_name}`);
              console.log('Детали транзакции:', details);
              this.createContribution(amount);
            } catch (error) {
              console.error('Ошибка завершения транзакции:', error);
            }
          },
          onError: (error) => {
            console.error('Ошибка оплаты:', error);
          },
        }).render('#paypal-button-container');
      })
      .catch(error => {
        console.error('Ошибка загрузки PayPal SDK:', error);
      });
  }

  private createContribution(amount: string) {
    const contributionData = {
      user_id: this.user_id,
      project_id: this.projectId,
      amount: parseFloat(amount),
    };

    this.contributionService.createContribution(contributionData).subscribe({
      next: (response) => {
        console.log('Вклад успешно создан/обновлен:', response);
        this.router.navigate([`/project/${this.projectId}`]).then(() => {
          window.location.href = `/project/${this.projectId}`;
        });
      },
      error: (err) => {
        console.error('Ошибка создания вклада:', err);
      }
    });
  }
}
